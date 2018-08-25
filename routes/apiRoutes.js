var db = require("../models/");

module.exports = function(router) {
  router.post("/results", function(req, res){
    console.log(req.body.subject);
    db.Tutor.findAll({
      where: {
        subjects: req.body.subject
      }
    }).then(function(dbTutors) {
      res.render("results", { tutor: dbTutors}); 
    });
  });

  // Create a new tutor with the data available to us in req.body from the sign up page
  router.post("/tutors", function(req, res) {
    //console.log(req.body);
    db.Tutor.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.psw,
      photo: req.body.photo,
      bio: req.body.about,
      subjects: req.body.subject
    }).then(function(newTutor) {
      //console.log(newTutor[0].dataValues.username);
      let username = req.body.username;
      res.redirect(`/tutors/${username}`)
    });
  });

  // Signs up a student
  router.post("/students", function(req, res) {
    db.Student.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.psw
    }).then(function(newStudent) {
      //console.log(newStudent);
      res.redirect("studentprofile", {student: newStudent})
    });
  });
  router.put("api/tutors/:id", function (req, res){
      db.Tutor.update({ }, { })
  });
  router.get("/api/students", function (req, res) {
    db.Tutor.findAll({}).then(function (dbStudents) {
      // res.render("results", tutor);
      res.json(dbStudents);
    });
  });
  router.get("/api/tutors", function (req, res) {
    db.Tutor.findAll({}).then(function (dbTutors) {
      // res.render("results", tutor);
      res.json(dbTutors);
    });
  });
  router.get("/api/messages", function (req, res) {
    db.Tutor.findAll({}).then(function (dbMessages) {
      // res.render("results", tutor);
      res.json(dbMessages);
    });
  });
  router.post("/messages/:user", function (req, res) {

    db.Message.create({
      to: this.getdataAttribute('data-username'),
      from: "student name",
      message: req.body.message
    }).then(function (newMessage) {
      res.end();
    });
  });

//find specific student
router.get("/students/:username", function(req, res) {

  db.Student.findAll({
    where: {
      username: req.body.uname
    }
  }).then(function(dbStudents) {
   // console.log(dbStudents)
    res.render("studentprofile", dbStudents);
  });
})

};
