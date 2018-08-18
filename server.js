require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var routes = require ("./routes/controller");
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
var db = require("./models");



var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


// For Passport
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); //session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions




// Handlebars
app.engine( "handlebars", exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

// Routes


// Routes
require("./routes/controller")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
// true will make database reset, use false if u want to keep the db
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
