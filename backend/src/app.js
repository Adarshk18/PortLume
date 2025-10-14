const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

// Middlewares
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL,credentials: true, }));
app.use(morgan('dev'));

// Passport (GitHub OAuth)
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/api', rateLimiter, apiRoutes);

// Health route
app.get('/', (req, res) => res.json({ ok: true, message: 'AutoPortfolio API' }));

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, message: 'Server error' });
});

module.exports = app;
