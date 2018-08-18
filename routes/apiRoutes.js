var db = require("../models");

module.export = function(app){
    
    //find all tutors
  app.get("/api/tutors", function(req, res) {
    db.Tutors.findAll({}).then(function(dbTutors) {
        res.json(dbTutor)
    });
  });

//find specific tutor
  app.get("/api/tutors/:id", function(req, res) {

    db.tutors.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  // find all students
  app.get("/api/students", function(req, res) {
    db.students.findAll({}).then(function(dbStudents) {
        res.json(dbStudents)
    });
  });

//find specific student
app.get("/api/students/:id", function(req, res) {

  db.students.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(dbStudents) {
    res.json(dbStudents);
  });
})
};
