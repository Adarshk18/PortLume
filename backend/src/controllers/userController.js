const User = require('../models/User');

module.exports = {
  // Get current logged-in user info
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-githubAccessToken -__v');
      
      if (!user) {
        return res.status(404).json({ ok: false, message: 'User not found' });
      }

      res.json({ 
        ok: true, 
        data: {
          _id: user._id,
          username: user.username,
          displayName: user.displayName || user.username,
          email: user.email,
          githubUsername: user.githubUsername,
          githubAvatarUrl: user.githubAvatarUrl,
          bio: user.bio,
          skills: user.skills,
          plan: user.plan || 'free',
          aiUsageThisMonth: user.aiUsageThisMonth || 0
        }
      });
    } catch (err) {
      console.error('❌ getMe:', err);
      res.status(500).json({ ok: false, message: 'Failed to fetch user data' });
    }
  }
};