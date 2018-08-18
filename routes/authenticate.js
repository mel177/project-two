var db = require("../models");
var passport = require("passport");
var application = application = require('./application');

module.exports = function(app) {
    app.get('/login', application.IsAuthenticated, function(req,res) {
        res.redirect("/users/" + req.user.username)
    })

    app.post('/authenticate',
    passport.authenticate('local',{
    successRedirect: '/login',
    failureRedirect: '/'
    })
    )

    app.get('/logout', application.destroySession)
    app.get('/signup', function(req,res) {
        res.render("signup")
    })

    app.post('/registerAsTutor', function(req, res){
        db.tutor.findOne({where: {username: req.username}}).then(function (user){
            if(!user) {
                db.tutor.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    phone: req.body.phone,
                    subjects: req.body.subjects,
                    bio: req.body.bio,
                    ratings: req.body.ratings,
                    availability: req.body.availability,
                    email: req.body.eamil
                }).then(function(dbUser,err){
                    if (err) {
                        console.log(err);
                        res.redirect("/")
                    }
                });
            } else {
                console.log('user doesnt exist yet...');
                res.redirect('/signup')
            }
        })
        res.redirect('/')
    });

    app.post('/registerAsStudent', function(req, res){
        db.students.findOne({where: {username: req.username}}).then(function (user){
            if(!user) {
                db.students.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    phone: req.body.phone,
                    subjects: req.body.subjects
                }).then(function(dbUser,err){
                    if (err) {
                        console.log(err);
                        res.redirect("/")
                    }
                });
            } else {
                console.log('user doesnt exist yet...');
                res.redirect('/signup')
            }
        })
        res.redirect('/')
    });
}