const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, message: 'Too many requests, slow down.' }
});
