const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/auth/github/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // profile.username is GitHub username
          const username = profile.username || profile.id;
          let user = await User.findOne({ githubId: profile.id });
          if (!user) {
            user = await User.create({
              githubId: profile.id,
              username,
              displayName: profile.displayName || username,
              avatar: profile.photos?.[0]?.value,
              githubAccessToken: accessToken
            });
          } else {
            // keep accessToken updated (optional)
            user.githubAccessToken = accessToken;
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          console.error('Passport GitHub error', err);
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id)
      .then((u) => done(null, u))
      .catch((e) => done(e, null))
  );
};
