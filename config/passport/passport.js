var bCrypt = require("bcrypt-nodejs");
var models = require("../../models");

module.exports = function(passport, user) {
  var Student = models.Student;
  var Tutor = models.Tutor;
  // require a simple username and password 
  var LocalStrategy = require("passport-local").Strategy;

  // this saves the User id 
  passport.saveUser(function (user, done) {
    done(null, user.id);
  });

  // this retrieves the User id 
  passport.retreiveUser(function (id, done) {
    User.findById(id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // registering a new user
  passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
      },
    // encrypting password
  function (req, email, password, done) {
    var generateHash = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
        var initialData = req;
        // checking to see if given email has already been used to register a user
    User.findOne({
      where: {
            email: email
      }
    }).then(function (user) {
      if (user) {
            return done(null, false, {
          message: "That email is already taken"
            });
          } else {
            var userPassword = generateHash(password);
        var authData = {
              password: userPassword,
          email: email,
            };
        // If not create a user
        User.create(authData).then(function (newUser, created) {
          if (!newUser) {
                return done(null, false);
          }
              if (newUser) {
                console.log(newUser);
                var secondaryData = {
                  name: req.body.name,
                  phone: req.body.phone,
              address: req.body.address,
              email: req.body.email,
                  subjects: req.body.subjects,
                  UserId: newUser.dataValues.id
            };

                // check to see if user is tutor or student
                if (req.body.uType == 1) {
                  console.log("create student", secondaryData);
                  // creates student
              Student.create(secondaryData).then(function (req, res) {
                    console.log("new student body here", req.body);
                return done(null, newUser);
                    // res.redirect('/student');
                  });
                } else {
              // creates tutor
              console.log("create tutor", secondaryData);
              Tutor.create(secondaryData).then(function (req, res) {
                    console.log("new tutor body here", req.body);
                return done(null, newUser);
                    // res.redirect('/tutor');
              });
            }
            return done(null, newUser);
            }
            });
      }
        });
  });

  // Passport strategy for logging user
  passport.use("local-signin", new LocalStrategy({
    // by default, local strategy uses username and password
    // we will override with email
    usernameField: "email",
    passwordField: "password",
        passReqToCallback: true
  },
  function (req, email, password, done) {
    var User = models.User;
    var passCheck = function (userpass, password) {
      return bCrypt.compareSync(password, userpass);
    };
    User.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      if (!user) {
        console.log("invalid email");
        return done(null, false, {
          message: "Email does not exist"
        });
      }
      if (!passCheck(user.password, password)) {
        console.log("invalid password");
        return done(null, false, {
          message: "Incorrect password."
        });
      };

      console.log("success");
          var userinfo = user.get();
          return done(null, userinfo);
    }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
        message: "Check your login and try again !"
      });
    });
  })
));
};
