var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET user setting page. */
router.get('/setting', function(req, res, next) {
  res.render('setting', {});
});

module.exports = router;
