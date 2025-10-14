const express = require('express');
const auth = require('../middlewares/auth');
const portfolioController = require('../controllers/portfolioController');
const multer = require('multer');
const Portfolio = require('../models/Portfolio');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

const router = express.Router();

// Protected user routes
router.get('/me', auth, portfolioController.getMyPortfolio);
router.post('/upload-resume', auth, upload.single('resume'), portfolioController.uploadResume);
router.post('/sync-github', auth, portfolioController.syncGithub);
router.post('/generate-about', auth, portfolioController.generateAbout);
router.post('/publish', auth, portfolioController.publishPortfolio);

// Public routes
router.get('/public/:publicUrl', portfolioController.getPublicProfile);
router.post('/track-view/:publicUrl', portfolioController.trackView);

router.get('/portfolio/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      return res.status(404).json({ ok: false, message: 'Portfolio not found' });
    }

    res.json({
      ok: true,
      data: {
        views: portfolio.views || 0,
        repoClicks: portfolio.repoClicks || 0,
        aiGenerationsLeft: portfolio.aiGenerationsLeft ?? 5,
        checklist: {
          githubConnected: !!portfolio.githubConnected,
          resumeUploaded: !!portfolio.resumeUploaded,
          aiSummariesReady: !!portfolio.aiSummariesReady,
          portfolioPublished: !!portfolio.portfolioPublished,
        },
        chartData: portfolio.analyticsData || [],
        publicUrl: `https://portlume.ai/${req.user.username}`,
        lastSynced: portfolio.lastSynced || null,
      },
    });
  } catch (err) {
    console.error('Error fetching portfolio:', err.message);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

module.exports = router;
