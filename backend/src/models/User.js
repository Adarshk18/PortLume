const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  githubId: { type: String, index: true },
  githubAccessToken: String,
  username: { type: String, index: true },
  displayName: String,
  email: String,
  avatar: String,
  bio: String,
  skills: [String],
  social: {
    linkedin: String
  },
  plan: { type: String, default: 'free' }, // free | pro
  aiUsageThisMonth: { type: Number, default: 0 }, // track AI calls for quota
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
