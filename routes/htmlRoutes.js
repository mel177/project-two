var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });


  app.get("/results", function (req, res) {
    db.Tutor.findAll({
      where: {
        subjects: req.body.subject
      }
    }).then(function (dbTutors) {
      res.render("results", {
        tutor: dbTutors
      });
    });
  });

  app.get("/tutors/:username", function (req, res) {
    db.Tutor.findOne({ 
      where: {
        username: req.params.username
      }
    }).then(function (dbTutors) {
      console.log(dbTutors)
      res.render("tutorprofile", {
        tutor: dbTutors
      });
    });
  });

  app.get("/students/:username", function (req, res) {
    db.Students.findAll({ //we need a join that gets messages from the messages table and user into from students table
      where: {
        username: req.params.username
      }
    }).then(function (dbStudents) {
      res.render("studentprofile", {
        student: dbStudents 
      });
    });
  });
  app.put("/appointment/:id", function (req, res) {
    db.tutor
      .update({
        available: req.body.available
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function (dbTutors) {
        res.redirect("/cancel");
      });
  });

  app.get("/cancel", function (req, res) {
    db.User.findAll({}).then(function (data) {
      var hbsObject = {
        user: data
      };
      res.render("cancel", hbsObject);
    });
  });

  app.put("/cancel/:id", function (req, res) {
    db.User.update({
      available: req.body.available
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (dbTutors) {
      res.redirect("/cancel");
    });
  });

  app.delete("/appointment/:id", function (req, res) {
    db.tutor
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbTutors) {
        res.redirect("/delete");
      });
  });

  app.put("/appointment/:id", function (req, res) {
    db.tutor
      .update({
        available: req.body.available
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function (dbTutors) {
        res.redirect("/appointment");
      });
  });
};