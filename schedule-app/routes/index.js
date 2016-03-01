var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. (with login section) */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

//process login form
// app.post('/login', passport work here);


/* GET user setting page. */
router.get('/setting', function(req, res, next) {
  res.render('setting', {});
});

/* GET account page. (after login) 
 * Protected section, must be logged in to access
 */
router.get('/account', isLoggedIn, function(req, res, next){
	res.render('account', {
		user : req.user // get user out of session and pass to template
	});
});

/* GET signup page. */
router.get('/signup', function(req, res, next){
	res.render('signup.ejs', {});
});

//check if user is logged in
function isLoggedIn(req, res, next){
	
	//if user is authenticated, continue
	if(req.isAuthenticated())
		return next();
	
	//if user is not authenticated
	res.redirect('/');
}

module.exports = router;