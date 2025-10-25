const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const portfolioController = require('../controllers/portfolioController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/me', auth, portfolioController.getMyPortfolio);
router.post('/upload-resume', auth, upload.single('resume'), portfolioController.uploadResume);
router.post('/sync-github', auth, portfolioController.syncGithub);
router.post('/generate-about', auth, portfolioController.generateAbout);
router.post('/publish', auth, portfolioController.publishPortfolio);
router.get('/public/:publicUrl', portfolioController.getPublicProfile);
router.post('/track-view/:publicUrl', portfolioController.trackView);

module.exports = router;
