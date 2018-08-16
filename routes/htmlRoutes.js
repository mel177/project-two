var db = require("../models");


module.exports = function(router) {


//Render the home page of the app
router.get("/", function(req, res) {
  //if the client is a tutor then render tutor view
  //if the client is a student then render the student view
  //else?
      res.render('index')
  });

//Render the sign up page
router.get("/sign-up", function(req, res){
  res.render('sign-up')
});


  // Render 404 page for any unmatched routes
  router.get("*", function(req, res) {
    res.render("404");
  });



};