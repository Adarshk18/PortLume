const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    repoId: String,
    name: String,
    description: String,
    readmeSnippet: String,
    url: String,
    languages: [String],
    stars: Number
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    headline: String,
    about: String,
    projects: [ProjectSchema],
    theme: { type: String, default: 'default' },
    publicUrl: { type: String, index: true },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    aiUsageCount: { type: Number, default: 0 }, // track free-tier usage
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
