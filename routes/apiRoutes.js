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
      console.log(dbTutors[0].dataValues);
      var tutor = {
        tutorName: dbTutors[0].dataValues.name,
        tutorUsername: dbTutors[0].dataValues.username,
        tutorNumber: dbTutors[0].dataValues.phone,
        tutorSub: dbTutors[0].dataValues.subjects,
        tutorBio: dbTutors[0].dataValues.bio,
        tutorRating: dbTutors[0].dataValues.ratings
      };
      console.log(tutor);
      res.render("results", tutor); 
    });
  });

  // Create a new tutor with the data available to us in req.body from the sign up page
  router.post("/create", function(req, res) {
    //console.log(req.body);
    db.Tutor.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      bio: req.body.bio,
      phonenumber: req.body.number,
      subject: req.body.subject
    }).then(function(dbTutor) {
      res.json(dbTutor);
    });
  });
  // Signs up a student
  router.post("/api/create/students", function(req, res) {
    db.Student.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.psw
    }).then(function(newStudent) {
      console.log(newStudent);
    });
  });
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
