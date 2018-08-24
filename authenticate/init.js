var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy

var user = {
  username: 'test-user',
  passwordHash: 'bcrypt-hashed-password',
  id: 1
};

// once the findUser returns with our user object the only thing left is to compare the user's hashed password and the real password to see if there is a match. Always store passwords hashed and use fixed time comparison to avoid timing attacks.

// If it is a match, we let the user in (by returning the user to passport - return done(null, user)), if not we return an unauthorized error (by returning nothing to passport - return done(null)).

passport.use(new LocalStrategy(
 (username, password, done) => {
    findUser(username, (err, user) => {
      if (err) {
        return done(err)
      }

      // User not found
      if (!user) {
        return done(null, false)
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.passwordHash, (err, isValid) => {if (err) {
        return done(err)
      }
      if (!isValid) {
        return done(null, false)
      }
      return done(null, user)
    });
  });
}
));