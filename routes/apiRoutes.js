var db = require("../models/");
var passport = require('passport');
module.exports = function(router) {


  router.post("/results", function(req, res){
    console.log(req.body.subject);
    db.Tutor.findAll({
      where: {
        subjects: req.body.subject
      }
    }).then(function(dbTutors) {
      //res.json(dbTutors)
      //res.render('results', dbTutors);
      console.log(dbTutors[0])
      res.render("results", { tutor: dbTutors}); 
    });
  });

  // Create a new tutor with the data available to us in req.body from the sign up page
  router.post("/api/tutors", function(req, res) {
    //console.log(req.body);
    db.Tutor.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.psw,
      bio: req.body.bio,
      phonenumber: req.body.number,
      subjects: req.body.subject
    }).then(function(newTutor) {
      console.log(newTutor);
      res.render("tutorprofile", {tutor: newTutor})
    });
  });
  // Signs up a student
  router.post("/api/students", function(req, res) {
    db.Student.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.psw
    }).then(function(newStudent) {
      console.log(newStudent);
      res.render("studentprofile", {student: newStudent})
    });
  });
  router.put("api/tutors/:id", function (req, res){
      db.Tutor.update({ }, { })
  });
  router.post("/messages/:user", function(req, res){
    db.Message.create({
      to: req.params.user,
      from: "student name",
      message: req.body.message
    }).then(function(newMessage) {
      console.log(newMessage);
      res.redirect("/results") // need to figure out how to re display the results where they left off
    });
  });
  //find specific tutor



  

//find specific student
router.get("/students/:username", function(req, res) {

  db.Student.findAll({
    where: {
      username: req.body.uname
    }
  }).then(function(dbStudents) {
    console.log(dbStudents)
    res.render("studentprofile", dbStudents);
  });
})

};
