require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Write cookies on header
app.use(cookieParser());

// create a session for user
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


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
