const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ ok: false, message: 'No token provided' });
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ ok: false, message: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error', err.message);
    return res.status(401).json({ ok: false, message: 'Auth failed' });
  }
};
