var db = require("../models");
var passport = require("passport");
var application = require("./application");

module.exports = function(app) {
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/login",
      failureRedirect: "/",
      failureFlash: "Invalid username or password."
    })
  );

  app.get("/logout", application.destroySession);
  app.get("/signup", function(req, res) {
    res.render("signup");
  });
};
