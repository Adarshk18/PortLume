const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ ok: false, message: 'No token' });
    const token = auth.split(' ')[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id);
    if (!user) return res.status(401).json({ ok: false, message: 'Invalid user' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: 'Unauthorized', error: err.message });
  }
};
