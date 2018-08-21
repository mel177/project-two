var db = require("../models/");
var router = require("express");
var router = router.Router();
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
  //router.put("api/students/:id", function (req, res))
  /*
//find specific tutor
  router.get("/api/tutors/:id", function(req, res) {

    db.Tutor.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });


//find specific student
router.get("/api/students/:id", function(req, res) {

  db.Student.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(dbStudents) {
    res.json(dbStudents);
  });
})
} 
  
*/
};
