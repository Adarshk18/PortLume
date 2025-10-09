const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/auth/github/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // find or create
          const existing = await User.findOne({ githubId: profile.id });
          if (existing) {
            // update possible avatar / username
            existing.username = profile.username || existing.username;
            existing.displayName = profile.displayName || existing.displayName;
            existing.avatar = profile.photos?.[0]?.value || existing.avatar;
            existing.githubAccessToken = accessToken || existing.githubAccessToken;
            await existing.save();
            return done(null, existing);
          }

          const user = await User.create({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName || profile.username,
            avatar: profile.photos?.[0]?.value,
            githubAccessToken: accessToken
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id).then(u => done(null, u)).catch(done)
  );
};
