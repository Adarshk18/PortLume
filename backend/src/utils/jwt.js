const jwt = require('jsonwebtoken');
module.exports = {
  sign: (payload, opts = {}) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: opts.expiresIn || '30d' })
};
