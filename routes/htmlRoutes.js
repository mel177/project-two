var db = require("../models");
var passport = require("../config/passport");
// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });
  

  app.get("/results", function(req, res) {
    db.Tutor.findAll({
      where: {
        subjects: req.body.subject
      }
    }).then(function(dbTutors) {
      // console.log(req);
      // //res.json(dbTutors)
      // //res.render('results', dbTutors);
      // console.log(dbTutors);
      var tutor = {
        tutorName: dbTutors.name,
        tutorUsername: dbTutors.username,
        tutorSub: dbTutors.subjects,
        tutorBio: dbTutors.bio,
        tutorRating: dbTutors.ratings
      };
      console.log(tutor);
      // res.render("results", tutor);
      console.log("this does something");
      res.render("results", tutor);
    });
  });

  app.get("/tutors/:username", function(req, res) {
    db.Message.findAll({ //we need a join that gets messages from the messages table and user into from tutor table
      where: {
        to: req.params.username
      }
    }).then(function(messages) {
      res.render("tutorprofile", {message: messages});
    });
  });

  app.get("/students/:username", function(req, res) {
    db.Message.findAll({ //we need a join that gets messages from the messages table and user into from students table
      where: {
        to: req.params.username
      }
    }).then(function(messages) {
      res.render("studentprofile", {message: messages});
    });
  });
  app.get("/api/students", function(req, res) {
    res.redirect("/students/:username")
  });
  app.put("/appointment/:id", function(req, res) {
    db.tutor
      .update(
        {
            available: req.body.available
        },
            {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbTutors) {
        res.redirect("/cancel");
      });
  });

  app.get("/cancel", function(req, res) {
    db.User.findAll({}).then(function(data) {
      var hbsObject = {
        user: data
      };
      res.render("cancel", hbsObject);
    });
  });

  app.put("/cancel/:id", function(req, res) {
    db.User.update(
      {
          available: req.body.available
        },
      {
          where: {
          id: req.params.id
        }
      }
    ).then(function(dbTutors) {
      res.redirect("/cancel");
    });
  });

  app.delete("/appointment/:id", function(req, res) {
    db.tutor
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTutors) {
        res.redirect("/delete");
      });
  });

  app.put("/appointment/:id", function(req, res) {
    db.tutor
      .update(
        {
            available: req.body.available
          },
            {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbTutors) {
        res.redirect("/appointment");
      });
    });
    //handle login route
    app.get('/login', function(req, res) {
      res.render('login');
  });

  //handle register route
  app.get('/register', function(req, res) {
      res.render('register');
  });
  //handle logout route
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  // handle login route
  app.post("/login", passport.authenticate('local'), function(req, res) {
    res.json('/');
});

// handle register route and register user to database
app.post("/register", function(req, res) {

    db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then((result)=> {
        console.log(result);
        // send user back to login page
        res.json('/login')
    }).catch(function(err) {
        //if err throw err to user
        res.json(err);
    });
  });

  //Twitter login routes
  app.get('/auth/twitter',
  passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/twittererror' }),
    function(req, res) {

    // Successful authentication, redirect home.
    res.redirect('/');
  });


  //facebook login routes
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email']}));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/facebookerror' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

};
