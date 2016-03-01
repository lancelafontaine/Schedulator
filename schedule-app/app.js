var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var app = express();

var routes = require('./routes/index');
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
/*	app.use(session({ secret: 'iambutterfly' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;