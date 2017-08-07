const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const serverConfig = require('../../config/server.config');
const User = require('../models/User');
module.exports = function (app) {
  app.use(passport.initialize());

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    function (email, password, done) {
      User.findOne({email}, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user || !user.checkPassword(password)) {
          return done(null, false, {message: 'User not found'});
        }

        return done(null, user);
      });
    }
    )
  );

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: serverConfig.jwtSecret
  };

  passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
      User.findById(payload.id, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  return passport;
};
