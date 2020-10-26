const passport = require('passport');
const OsuStrategy = require('passport-osu').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error('Failed to deserialize an user'));
    });
});

passport.use(
  new OsuStrategy(
    {
      type: 'StrategyOptions',
      clientID: keys.OSU_CLIENT_ID,
      clientSecret: keys.OSU_CLIENT_SECRET,
      callbackURL: '/auth/osu/redirect'
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        osuId: profile._json.id
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          username: profile._json.username,
          osuId: profile._json.id
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);
