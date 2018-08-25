require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// we required all the dependencies that the session management needs. After that we have created a new instance from the express-session module, which will store our sessions.
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// initiate session to authenticate user
require('./authentication').init(app);
var options = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'chat_session'
};

var sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

console.log("chat app is in session");



// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  // true will make database reset, use false if u want to keep the db
  syncOptions.force = true;
}

// ============================================
// authenticate
// app.get('/profile', passport.authenticationMiddleware(), renderProfile);

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
