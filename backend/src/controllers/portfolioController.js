const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const githubService = require('../services/githubService');
const aiService = require('../services/aiService');
const resumeParser = require('../services/resumeParser');
const cloudinary = require('../utils/cloudinary');

const FREE_QUOTA = Number(process.env.FREE_AI_QUOTA_PER_MONTH || 5);

module.exports = {
  getMyPortfolio: async (req, res) => {
    try {
      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) {
        portfolio = await Portfolio.create({ user: req.user._id });
      }
      res.json({ ok: true, portfolio });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, message: 'Error fetching portfolio' });
    }
  },

  uploadResume: async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ ok: false, message: 'No file' });
      // upload to cloudinary (or another service)
      const uploadResult = await cloudinary.uploadBuffer(req.file.buffer, `resumes/${req.user._id}`);
      // parse file (service expects either buffer or remote url)
      const parsed = await resumeParser.parseBuffer(req.file.buffer, uploadResult.secure_url);
      // create/update portfolio about/skills
      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = new Portfolio({ user: req.user._id });
      portfolio.about = parsed.summary || portfolio.about || parsed.text?.slice(0, 2000);
      portfolio.headline = portfolio.headline || parsed.headline || '';
      await portfolio.save();
      res.json({ ok: true, portfolio });
    } catch (err) {
      console.error('uploadResume', err);
      res.status(500).json({ ok: false, message: 'Resume upload/parse failed' });
    }
  },

  syncGithub: async (req, res) => {
    try {
      // Use stored github username or access token
      const username = req.user.username || req.user.githubId;
      const accessToken = req.user.githubAccessToken;
      const repos = await githubService.fetchTopRepos(username, accessToken);
      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = new Portfolio({ user: req.user._id });
      portfolio.projects = repos.map((r) => ({
        repoId: String(r.id),
        name: r.name,
        description: r.description,
        readmeSnippet: r.readmeSnippet || '',
        url: r.html_url,
        languages: r.language ? [r.language] : [],
        stars: r.stargazers_count || 0
      }));
      await portfolio.save();
      res.json({ ok: true, projects: portfolio.projects });
    } catch (err) {
      console.error('syncGithub error', err);
      res.status(500).json({ ok: false, message: 'GitHub sync failed' });
    }
  },

  generateAbout: async (req, res) => {
    try {
      const user = req.user;
      // enforce free-tier AI quota
      if (user.plan === 'free' && user.aiUsageThisMonth >= FREE_QUOTA) {
        return res.status(403).json({ ok: false, message: 'Free AI quota exceeded' });
      }

      let portfolio = await Portfolio.findOne({ user: user._id });
      if (!portfolio) portfolio = new Portfolio({ user: user._id });

      // Build prompt from available data
      const promptComponents = [
        `Name: ${user.displayName || user.username}`,
        `Bio: ${user.bio || ''}`,
        `Skills: ${(user.skills || []).join(', ')}`,
        `Projects: ${portfolio.projects && portfolio.projects.length ? portfolio.projects.map(p => p.name + ': ' + (p.description || '')).join('\n') : ''}`,
        `Resume summary (if any): ${portfolio.about || ''}`
      ];
      const prompt = `Write a concise professional 'About' section for a developer. Use the following data:\n\n${promptComponents.join('\n')}\n\nWrite a 3-5 sentence bio suitable for a portfolio.`;

      const aboutText = await aiService.generateText(prompt, { max_tokens: 200 });

      portfolio.about = aboutText;
      await portfolio.save();

      // increment AI usage counter for user
      user.aiUsageThisMonth = (user.aiUsageThisMonth || 0) + 1;
      await user.save();

      res.json({ ok: true, about: aboutText });
    } catch (err) {
      console.error('generateAbout error', err);
      res.status(500).json({ ok: false, message: 'AI generation failed' });
    }
  },

  publishPortfolio: async (req, res) => {
    try {
      const { publicUrl } = req.body;
      if (!publicUrl) return res.status(400).json({ ok: false, message: 'publicUrl required' });
      // validate characters and uniqueness
      const normalized = publicUrl.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '-');
      const exists = await Portfolio.findOne({ publicUrl: normalized, user: { $ne: req.user._id } });
      if (exists) return res.status(409).json({ ok: false, message: 'Public URL already taken' });

      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = new Portfolio({ user: req.user._id });

      portfolio.publicUrl = normalized;
      portfolio.published = true;
      await portfolio.save();

      res.json({ ok: true, publicUrl: normalized });
    } catch (err) {
      console.error('publishPortfolio', err);
      res.status(500).json({ ok: false, message: 'Publish failed' });
    }
  },

  getPublicProfile: async (req, res) => {
    try {
      const p = await Portfolio.findOne({ publicUrl: req.params.publicUrl }).populate('user', '-githubAccessToken -__v');
      if (!p) return res.status(404).json({ ok: false, message: 'Not found' });
      res.json({ ok: true, profile: p });
    } catch (err) {
      console.error('getPublicProfile', err);
      res.status(500).json({ ok: false, message: 'Failed to load profile' });
    }
  },

  trackView: async (req, res) => {
    try {
      const p = await Portfolio.findOne({ publicUrl: req.params.publicUrl });
      if (!p) return res.status(404).json({ ok: false });
      p.views = (p.views || 0) + 1;
      await p.save();
      res.json({ ok: true, views: p.views });
    } catch (err) {
      console.error('trackView', err);
      res.status(500).json({ ok: false });
    }
  }
};
