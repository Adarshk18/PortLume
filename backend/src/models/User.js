const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    githubId: { type: String, index: true },
    username: { type: String, index: true },
    displayName: String,
    email: String,
    avatar: String,
    bio: String,
    skills: [String],
    social: {
        linkedin: String
    },
    githubAccessToken: String, // if granted
    plan: { type: String, default: 'free' }, // free | pro
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
