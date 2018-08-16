var db = require("../models");


module.exports = function(router) {

  // Find all Tutors with the subject searched for and return them to the user with res.json
  router.get("/api/tutors", function(req, res) {
    db.Tutors.findAll({
        where: {
            subject: req.body.subject
        }
    }).then(function(dbTutors) {
        //res.json(dbTutor)
      //res.render('index', dbTutors);
    });
  });

  // Create a new tutor with the data available to us in req.body from the sign up page
  router.post("/create", function(req, res) {
    //console.log(req.body);
    db.Tutors.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio,
            phonenumber: req.body.number        
    }).then(function(dbTutor) {
      res.json(dbTutor);
    });
  });
  
//Create a new student with the data avaiable to us in req.body from the sign up form
  router.post("/create", function(req, res) {
    //console.log(req.body);
    db.Students.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            phonenumber: req.body.number        
    }).then(function(dbTutor) {
      res.json(dbTutor);
    });
  });


  // Delete the Tutor with the id available to us in req.params.id
  router.delete("/api/tutors/delete", function(req, res) {
    db.Tutor.destroy({ where: { id: req.body.id }}).then(function(dbTutor) {
      res.json(dbTutor);
    });
  });

};

