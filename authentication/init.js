var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;

var authenticationMiddleware = require('./middleware');

// Generate Password
var saltRounds = 10
var myPlaintextPassword = 'my-password';
var salt = bcrypt.genSaltSync(saltRounds);
var passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

var user = {
  username: 'test-user',
  passwordHash,
  id: 1
};

// once the findUser returns with our user object the only thing left is to compare the user's hashed password and the real password to see if there is a match. Always store passwords hashed and use fixed time comparison to avoid timing attacks.

// If it is a match, we let the user in (by returning the user to passport - return done(null, user)), if not we return an unauthorized error (by returning nothing to passport - return done(null)).


function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err)
        }

        // User not found
        if (!user) {
          console.log('User not found')
          return done(null, false)
        }

        // Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.passwordHash, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;

