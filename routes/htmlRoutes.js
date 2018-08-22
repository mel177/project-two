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
};
