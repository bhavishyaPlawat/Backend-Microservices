const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        try {
          // Logic: Search for user; if not found, create them.
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            user = await User.create(newUser);
            return done(null, user);
          }
        } catch (err) {
          console.error(err);
          done(err, null);
        }
      },
    ),
  );
};
