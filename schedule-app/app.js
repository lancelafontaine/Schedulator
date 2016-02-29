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

module.exports = app;
