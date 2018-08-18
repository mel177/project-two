
var passport = require("passport");


var db = require("../models");
var passData = require("../config/passport/passport.js");

var router = (app) => {

// GET route for retrieving all students 
app.get('/index', function(req, res, next) {
    db.Student.findAll({

    }).then(function(dbStudents) {
        var hbsObject = {
            students: dbStudents
        };
        res.render("index", hbsObject);
    });

});



//---- START home page route--------------------//

app.get('/', function(req, res) {
    res.render('index');
});
//---- END home page route--------------------//



//----register and login routes--------------------//

app.get('/login', function(req, res) {
    res.render('login');
});


//----------- START ----- POST route that handles the account registration process ----// 
// if user is successfully created, it redirects to the next page in the registration process, /profile; 
// otherwise do the following: 
app.post('/register', passport.authenticate('local-signup', {

    successRedirect: '/profile',
    failureRedirect: '/login'

}));

//--------GET route that handles the logout process 
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

//--------- POST route that handles the login process 
app.post('/login', passport.authenticate('local-signin', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log(req);

    db.User.findOne(
        {
            where: {
                id: req.user.id
            }, 
            include: [db.Student, db.Tutor]
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            // console.log(dbUser);
            if(dbUser.Student !== null){
                res.redirect('/students-home');
            }
            if(dbUser.Tutor !== null){
                res.redirect('/tutors-home');
            }
 
    });


    
  });


//------------------ END login and register routes--------------------//




//------------------- START profile routes -----------------//

// GET route for loading the profile page, where registered users fill out more profile information
app.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile');
});

// POST route that creates either a Student or a Tutor in the database based on user's entry
app.post('/profile', function(req, res) {
    var userData = {
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address,
        UserId: req.user.id
    };
    console.log("This is the userData object", userData);
    if (req.body.uType == 1) {
        db.Student.create(userData).then(function(dbStudents) {
            res.redirect('/students');
        });
    } else {
        userData.subjects = req.body.subjects;
        db.Tutor.create(userData).then(function(dbTutors) {
            res.redirect('/tutors');
        });
    }
});


app.get("/schedule", isLoggedIn, function(req, res) {
    // var hbsObject1, hbsObject2;
    // var obj;

    db.User.findOne(
        {
            where: {
                id: req.user.id
            }, include: [db.Student, db.Tutor]
        }
        ).then(function(dbUser) {
        hbsObject = {
            user: dbUser
        };
        console.log(hbsObject);
        res.render("schedule", hbsObject);
    });
   
});

app.post("/api/appointments", function(req, res) { // what does the' argument do?
    // console.log(req.body);
    var userid = req.body.StudentId
    db.Appointments.create(req.body).then(function(dbAppointments) {

        res.json(dbAppointments);
        // res.render("/");
    });
    // console.log(req.body);
});

// GET get route to find all Appointmentss with left outer join including three models
app.get("/api/appointments", function(req, res) {
    db.Appointments.findAll({
        include: [db.Student, db.Tutor]
    }).then(function(dbAppointments) {
        res.json(dbAppointments);
    });
});

// GET route for retrieving a single Appointments
app.get("/api/appointments/:id", function(req, res) {
    db.Appointments.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Student, db.Tutor]
    }).then(function(dbAppointments) {
        res.json(dbAppointments);
    });
});


//----students route--------------------//
//get all students
app.get('/api/students', function(req, res, next) {
    db.Student.findAll(
        // include: [db.Post]
    ).then(function(dbStudents) {
        res.json(dbStudents);
    });
});
//get students by id
app.get('/api/students/:id', function(req, res, next) {
    db.Student.findAll({
        where: {
            id: req.params.id
        }
        // include: [db.Post]
    }).then(function(dbStudents) {
        res.json(dbStudents);
    });
});


app.get('/api/tutors', function(req, res, next) {
    db.Tutor.findAll(
        // include: [db.Post]
    ).then(function(dbTutors) {
        res.json(dbTutors);
    });
});

//GET route for retrieving tutor by id
app.get('/api/tutors/:id', function(req, res, next) {
    db.Tutor.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(dbTutors) {
        res.json(dbTutors);
    });
});


// GET route for retrieving all tutors for given subject to populate dropdown on scheduling page
app.get("/api/tutors/:subject", function(req, res) {
    db.Tutor.findAll({
        where: {
            subject: req.params.subject
        },
    }).then(function(dbSubjectTutors) {
        var hbsObject = {
            tutors: dbSubjectTutors
        };
        res.render("schedule", hbsObject);
    });
});


app.get('/students', isLoggedIn, function(req, res, next) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Student.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                },
                include: [db.Appointments]
            }
                ).then(function(dbStudents){

                var hbsObject = {
                    students: dbStudents
                };
                // console.log(JSON.stringify(hbsObject));
                res.render("students", hbsObject);

        });
  
    });
    // res.render('students');
});

app.get('/students-home', function(req, res) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Student.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                }
            }
                ).then(function(dbStudents){

                var hbsObject = {
                    students: dbStudents
                };
                // console.log(hbsObject);
                res.render('students-home');

        });
 
    });
    
});

app.get('/tutors-home', function(req, res) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Tutor.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                }
            }
                ).then(function(dbTutors){

                var hbsObject = {
                    tutors: dbTutors
                };
                // console.log(hbsObject);
                res.render('tutors-home');

        });
 
    });
    
});

app.get('/tutors', isLoggedIn, function(req, res, next) {
    db.User.findOne(
        {
            where: {
                id: req.user.id
            }
        }
        ).then(function(dbUser) {
            // console.log(dbUser);
            db.Tutor.findOne(
            {
                where: {
                    UserId: dbUser.dataValues.id
                },
                include: [db.Appointments]
            }
                ).then(function(dbTutors){

                var hbsObject = {
                    tutors: dbTutors
                };
                // console.log(JSON.stringify(hbsObject));
                res.render("tutors", hbsObject);

        });

        



        
    });
    // res.render('students');
});




}
//--- login helper function --------------//

//--- login helper function for Passport --------------//
// This lets us add the argument isLoggedIn to GET routes for rendering hbs pages to make them accessible only when a user is logged in; if user isn't logged in, it redirects to the login page
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = router;