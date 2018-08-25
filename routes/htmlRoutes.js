var db = require("../models");

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
      console.log(req.body);
      // //res.json(dbTutors)
      // //res.render('results', dbTutors);
      // console.log(dbTutors);
      var tutorData = {
        tutorName: dbTutors.name,
        tutorUsername: dbTutors.username,
        tutorSub: dbTutors.subjects,
        tutorBio: dbTutors.bio,
        tutorRating: dbTutors.ratings
      };
      // console.log(tutor);
      // res.render("results", tutor);
      console.log("this does something");
      res.render("results", { tutor: tutorData });
    });
  });

  app.get("/tutors/:username", function(req, res) {
    db.Message.findAll({
      //we need a join that gets messages from the messages table and user into from tutor table
      where: {
        to: req.params.username
      }
    }).then(function(messages) {
      res.render("tutorprofile", { message: messages });
    });
  });

  app.get("/students/:username", function(req, res) {
    db.Message.findAll({
      //we need a join that gets messages from the messages table and user into from students table
      where: {
        to: req.params.username
      }
    }).then(function(messages) {
      res.render("studentprofile", { message: messages });
    });
  });
  app.get("/api/students", function(req, res) {
    res.redirect("/students/:username");;
  });
  app.put("/appointment/:id", function(req, res) {
    db.Tutor.update(
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
    db.Tutor.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTutors) {
      res.redirect("/delete");
    });
  });

  app.put("/appointment/:id", function(req, res) {
    db.Tutor.update(
      {
        available: req.body.available
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbTutors) {
      res.redirect("/appointment");
    });
  });
};
