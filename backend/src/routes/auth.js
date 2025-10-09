const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// GitHub OAuth start
router.get('/github', passport.authenticate('github', { scope: ['user:email', 'repo'] }));

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/auth/failure' }),
  (req, res) => {
    // issue JWT and redirect to frontend with token param
    const payload = { id: req.user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    const redirect = `${process.env.FRONTEND_URL}/auth/success?token=${token}`;
    res.redirect(redirect);
  }
);

router.get('/failure', (req, res) => res.status(401).json({ ok: false, message: 'Auth failed' }));

module.exports = router;
