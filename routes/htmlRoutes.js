var db = require("../models");
var application = application = require('./application');

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function (req, res) {
    var isLoggedIn = false;
    res.render("index", { isLoggedIn: isLoggedIn });
  });

  app.get("/results", function(req, res){
    console.log("this does something")
    res.render("partials/tutors/tutors-card", tutor);
    });
 

  app.get("/profiles", function (req, res) {  
    db.tutor.findAll({        
    }).then(function(data){
      var hbsObject = {
        tutor: data
      };
    res.render("profiles", hbsObject);    
    })
  }); 

  app.get("/appointment", application.isAuthenticated, function (req, res) {  
    db.tutor.findAll({        
    }).then(function(data){
      var hbsObject = {
        tutor: data
      };
    res.render("appointment", hbsObject);    
    })
  }); 

  app.put("/appointment/:id", function(req, res) {
    db.tutor.update({
        available: req.body.available
      },
        {
      where: {
        id: req.params.id,
      }
    }).then(function(dbTutors) {
      res.redirect("/cancel");
    });
  });

  app.get("/cancel", function (req, res) {  
    db.User.findAll({        
    }).then(function(data){
      var hbsObject = {
        user: data
      };
    res.render("cancel", hbsObject);    
    })
  }); 

  app.put("/cancel/:id", function(req, res) {
    db.User.update({
        available: req.body.available
      },
        {
      where: {
        id: req.params.id,
      }
    }).then(function(dbTutors) {
      res.redirect("/cancel");
    });
  });


  app.delete("/appointment/:id", function(req, res) {
    db.tutor.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTutors) {
      res.redirect("/delete");
    });
  });

  app.put("/appointment/:id", function(req, res) {
    db.tutor.update({
        available: req.body.available
      },
        {
      where: {
        id: req.params.id,
      }
    }).then(function(dbTutors) {
      res.redirect("/appointment");
    });
  });
  
};