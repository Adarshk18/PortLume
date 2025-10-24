const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();

const rateLimiter = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const portfolioRoutes = require('./routes/portfolioRoutes'); // ✅ Add this line

const app = express();

// ========================================================
// 🧩 Middlewares
// ========================================================
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(morgan('dev'));

// ========================================================
// 🔐 Passport (GitHub OAuth)
// ========================================================
app.use(passport.initialize());
require('./config/passport')(passport);

// ========================================================
// 🚦 Routes
// ========================================================

// Auth routes
app.use('/auth', authRoutes);

// API routes (general)
app.use('/api', rateLimiter, apiRoutes);

// ✅ Portfolio routes (main fix)
app.use('/api/portfolio', rateLimiter, portfolioRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'AutoPortfolio API running successfully 🚀' });
});

// ========================================================
// ⚠️ Global Error Handler
// ========================================================
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ ok: false, message: 'Server error', error: err.message });
});

module.exports = app;
