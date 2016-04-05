var express = require('express');
var passport = require('passport');
var Login_info = require('../models/login');
var student_record = require('../models/student_record');
var courses_completed = require('../models/courses_completed');
var course = require('../models/course');
var router = express.Router();





router.get('/', function (req, res) {
        //find record of the student
        student_record.findOne({ id : req.session.passport.user}).exec(function (err, student){   
            //find courses completed        
            courses_completed.find({ student_id : req.session.passport.user}).exec(function (err, user){
                res.render('index', {user : req.user, name: student, jason: user});
            })

           //res.render('index', {user : req.user, name: student});
    })

    //res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/setting', function(req, res) {
    res.render('setting', { });
});
router.post('/register', function(req, res, next) {
    Login_info.register(new Login_info({ username : req.body.username }), req.body.password, function(err, login) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user, message : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/student_record', function(req, res) {
    student_records.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
