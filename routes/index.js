var express = require('express');
var passport = require('passport');
var Login_info = require('../models/login');
var Course_info = require('../models/course');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
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

router.post('/admin', function(req, res, next){
	Course_info.register(new Course_info({	course_name : req.body.course_name, 
											course_type : req.body.course_type,
											course_section : req.body.course_type,
											course_days : req.body.course_days,
											course_start_time : req.body.course_start_time,
											course_end_time : req.body.course_end_time,
											course_room : req.body.course_room,
											course_semester : req.body.course_semester
											}), function (err, course){
												if(err){
													return res.render("index", {info: "Course already exists."});
												}
												req.session.save(function (err) {
													if (err) {
														return next(err);
													}
													res.redirect('/');
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

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
