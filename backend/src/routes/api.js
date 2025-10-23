const express = require('express');
const multer = require('multer');
const auth = require('../middlewares/auth');
const portfolioController = require('../controllers/portfolioController');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// =============================
// ⚙️ Multer Setup
// =============================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// =============================
// 🔒 Protected User Routes
// =============================

// Get logged-in user's portfolio
router.get('/me', auth, portfolioController.getMyPortfolio);

// Upload resume (PDF, DOCX, etc.)
router.post(
  '/upload-resume',
  auth,
  upload.single('resume'),
  portfolioController.uploadResume
);

// Sync GitHub data (repositories, commits, etc.)
router.post('/sync-github', auth, portfolioController.syncGithub);

// Generate "About Me" section using AI
router.post('/generate-about', auth, portfolioController.generateAbout);

// Publish portfolio (make public)
router.post('/publish', auth, portfolioController.publishPortfolio);

// =============================
// 🌍 Public Routes
// =============================

// Get public portfolio by unique URL
router.get('/public/:publicUrl', portfolioController.getPublicProfile);

// Track public portfolio view (analytics)
router.post('/track-view/:publicUrl', portfolioController.trackView);

// =============================
// 📊 Portfolio Analytics & Status
// =============================
router.get('/portfolio/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });

    if (!portfolio) {
      return res.status(404).json({
        ok: false,
        message: 'Portfolio not found',
      });
    }

    res.json({
      ok: true,
      data: {
        views: portfolio.views ?? 0,
        repoClicks: portfolio.repoClicks ?? 0,
        aiGenerationsLeft: portfolio.aiGenerationsLeft ?? 5,
        checklist: {
          githubConnected: !!portfolio.githubConnected,
          resumeUploaded: !!portfolio.resumeUploaded,
          aiSummariesReady: !!portfolio.aiSummariesReady,
          portfolioPublished: !!portfolio.portfolioPublished,
        },
        chartData: portfolio.analyticsData || [],
        publicUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/public/${req.user.username}`,
        lastSynced: portfolio.lastSynced || null,
      },
    });
  } catch (err) {
    console.error('❌ Error fetching portfolio:', err.message);
    res.status(500).json({
      ok: false,
      message: 'Server error while fetching portfolio',
    });
  }
});

// =============================
// ✅ Export Router
// =============================
module.exports = router;
