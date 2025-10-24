const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const githubService = require('../services/githubService');
const aiService = require('../services/aiService');
const resumeParser = require('../services/resumeParser');
const cloudinary = require('../utils/cloudinary');

const FREE_QUOTA = Number(process.env.FREE_AI_QUOTA_PER_MONTH || 5);

module.exports = {
  // ========================================================
  // 📘 Fetch logged-in user's portfolio
  // ========================================================
  getMyPortfolio: async (req, res) => {
    try {
      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = await Portfolio.create({ user: req.user._id });

      res.json({ ok: true, data: portfolio });
    } catch (err) {
      console.error('❌ getMyPortfolio:', err);
      res.status(500).json({ ok: false, message: 'Error fetching portfolio' });
    }
  },

  // ========================================================
  // 📄 Upload and parse resume
  // ========================================================
  uploadResume: async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ ok: false, message: 'No file uploaded' });

      const io = req.app.get('io');

      // Upload to cloudinary
      const uploadResult = await cloudinary.uploadBuffer(
        req.file.buffer,
        `resumes/${req.user._id}`
      );

      // Parse resume text
      const parsed = await resumeParser.parseBuffer(req.file.buffer, uploadResult.secure_url);

      // Save parsed details to portfolio
      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = new Portfolio({ user: req.user._id });

      portfolio.resumeUrl = uploadResult.secure_url;
      portfolio.resumeUploaded = true;
      portfolio.about =
        parsed.summary ||
        portfolio.about ||
        parsed.text?.slice(0, 2000) ||
        'Resume uploaded successfully.';
      portfolio.headline = portfolio.headline || parsed.headline || '';

      await portfolio.save();

      // Emit realtime update
      io.emit(`portfolioUpdated:${req.user._id}`, { type: 'resumeUploaded', portfolio });

      res.json({ ok: true, message: 'Resume uploaded successfully', data: portfolio });
    } catch (err) {
      console.error('❌ uploadResume:', err);
      res.status(500).json({ ok: false, message: 'Resume upload or parse failed' });
    }
  },

  // ========================================================
  // 🐙 Sync GitHub repositories
  // ========================================================
  syncGithub: async (req, res) => {
    try {
      const username = req.user.githubUsername || req.user.username;
      const accessToken = req.user.githubAccessToken;

      if (!username)
        return res.status(400).json({ ok: false, message: 'GitHub account not linked' });

      const io = req.app.get('io');
      const repos = await githubService.fetchTopRepos(username, accessToken);

      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = new Portfolio({ user: req.user._id });

      portfolio.githubConnected = true;
      portfolio.projects = repos.map((r) => ({
        repoId: String(r.id),
        name: r.name,
        description: r.description,
        readmeSnippet: r.readmeSnippet || '',
        url: r.html_url,
        languages: r.language ? [r.language] : [],
        stars: r.stargazers_count || 0,
      }));

      portfolio.lastSynced = new Date();
      await portfolio.save();

      io.emit(`portfolioUpdated:${req.user._id}`, { type: 'githubSynced', portfolio });

      res.json({ ok: true, message: 'GitHub synced successfully', data: portfolio.projects });
    } catch (err) {
      console.error('❌ syncGithub:', err);
      res.status(500).json({ ok: false, message: 'GitHub sync failed' });
    }
  },

  // ========================================================
  // 🧠 Generate About section using AI
  // ========================================================
  generateAbout: async (req, res) => {
    try {
      const user = req.user;
      const io = req.app.get('io');

      if (user.plan === 'free' && (user.aiUsageThisMonth || 0) >= FREE_QUOTA) {
        return res
          .status(403)
          .json({ ok: false, message: 'Free AI quota exceeded. Upgrade to Pro for more generations.' });
      }

      let portfolio = await Portfolio.findOne({ user: user._id });
      if (!portfolio) portfolio = new Portfolio({ user: user._id });

      // Build AI prompt
      const prompt = `
        Create a concise, professional 3–5 sentence developer bio using this data:
        Name: ${user.displayName || user.username}
        Bio: ${user.bio || ''}
        Skills: ${(user.skills || []).join(', ')}
        Projects: ${portfolio.projects?.map(p => `${p.name}: ${p.description || ''}`).join('\n')}
        Resume Summary: ${portfolio.about || ''}
      `;

      const aboutText = await aiService.generateText(prompt, { max_tokens: 200 });

      portfolio.about = aboutText.trim();
      await portfolio.save();

      // Track AI usage
      user.aiUsageThisMonth = (user.aiUsageThisMonth || 0) + 1;
      await user.save();

      io.emit(`portfolioUpdated:${user._id}`, { type: 'aboutGenerated', about: aboutText });

      res.json({ ok: true, message: 'AI About generated', data: aboutText });
    } catch (err) {
      console.error('❌ generateAbout:', err);
      res.status(500).json({ ok: false, message: 'AI generation failed' });
    }
  },

  // ========================================================
  // 🌍 Publish portfolio to a public URL
  // ========================================================
  publishPortfolio: async (req, res) => {
    try {
      const { publicUrl } = req.body || {};
      if (!publicUrl)
        console.error("❌ publishPortfolio: Missing publicUrl in req.body");
        return res.status(400).json({ ok: false, message: 'Public URL is required' });

      const normalized = publicUrl.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '-');
      const existing = await Portfolio.findOne({
        publicUrl: normalized,
        user: { $ne: req.user._id },
      });

      if (existing)
        return res.status(409).json({ ok: false, message: 'This public URL is already taken' });

      const io = req.app.get('io');
      let portfolio = await Portfolio.findOne({ user: req.user._id });
      if (!portfolio) portfolio = new Portfolio({ user: req.user._id });

      portfolio.publicUrl = normalized;
      portfolio.portfolioPublished = true;
      await portfolio.save();

      io.emit(`portfolioUpdated:${req.user._id}`, { type: 'published', publicUrl: normalized });

      res.json({
        ok: true,
        message: 'Portfolio published successfully',
        data: { publicUrl: normalized },
      });
    } catch (err) {
      console.error('❌ publishPortfolio:', err);
      res.status(500).json({ ok: false, message: 'Publish failed' });
    }
  },

  // ========================================================
  // 👁️ Get public portfolio by URL
  // ========================================================
  getPublicProfile: async (req, res) => {
    try {
      const portfolio = await Portfolio.findOne({ publicUrl: req.params.publicUrl })
        .populate('user', '-githubAccessToken -__v');

      if (!portfolio)
        return res.status(404).json({ ok: false, message: 'Portfolio not found' });

      res.json({ ok: true, data: portfolio });
    } catch (err) {
      console.error('❌ getPublicProfile:', err);
      res.status(500).json({ ok: false, message: 'Failed to load public profile' });
    }
  },

  // ========================================================
  // 📈 Track public profile views
  // ========================================================
  trackView: async (req, res) => {
    try {
      const io = req.app.get('io');
      const portfolio = await Portfolio.findOne({ publicUrl: req.params.publicUrl });

      if (!portfolio) return res.status(404).json({ ok: false });

      portfolio.views = (portfolio.views || 0) + 1;
      await portfolio.save();

      io.emit(`portfolioUpdated:${portfolio.user}`, {
        type: 'viewTracked',
        views: portfolio.views,
      });

      res.json({ ok: true, message: 'View tracked', data: { views: portfolio.views } });
    } catch (err) {
      console.error('❌ trackView:', err);
      res.status(500).json({ ok: false, message: 'Failed to track view' });
    }
  },
};
