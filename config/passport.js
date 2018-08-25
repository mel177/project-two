var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: 'email',
    },
    function(email, password, done) {
        // When a user tries to sign in this code runs
        db.User.findOne({
            where: {
                email: email
            },
            raw: true
        }).then(function(dbUser) {
            // If there's no user with the given email
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            // If there is a user with the given email, but the password the user gives us is incorrect
            if (dbUser.password != password) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If none of the above, return the user
            console.log("Congrats");
            return done(null, dbUser);
        });
    }
));

// telling passport to use Twitter Strategy
// passport.use(new TwitterStrategy({
//         consumerKey: process.env.TW_KEY,
//         consumerSecret: process.env.TW_SECRET,
//         userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
//         callbackURL: "https://betterbrains.herokuapp.com/auth/twitter/callback"
//     },
//     function(token, tokenSecret, profile, done) {
//         db.User.findOrCreate({
//             where: { twitterId: profile.id },
//             defaults: {
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 location: profile._json.location,
//                 profile_picture: profile.photos[0].value
//             }
//         }).spread((User, created) => {
//             var newData = User.get({
//                 plain: true
//             })
//             if (!created) {
//                 console.log("account id already exits");
//                 return done(null, newData);
//             }
//             console.log("Congrats");
//             return done(null, newData);
//         });
//     }));

// telling passport to use Facebook Strategy
// passport.use(new FacebookStrategy({
//         clientID: process.env.FB_ID,
//         clientSecret: process.env.FB_SECRET,
//         callbackURL: "https://betterbrains.herokuapp.com/auth/facebook/callback",
//         profileFields: ['id', 'displayName', 'photos', 'emails']
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         console.log(profile);
//         db.User.findOrCreate({
//             where: { facebookId: profile.id },
//             defaults: {
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 profile_picture: profile.photos[0].value
//             }
//         }).spread((User, created) => {
//             var newData = User.get({
//                 plain: true
//             })
//             if (!created) {
//                 console.log("account id already exits");
//                 return cb(null, newData);
//             }
//             console.log("Congrats");
//             return cb(null, newData);
//         });
//     }));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    cb(null, id);
});

// Exporting our configured passport
module.exports = passport;