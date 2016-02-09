var express = require('express');
var router = express.Router();

/* GET User Preference page. */
router.get('/setting', function(req, res, next) {
  res.render('setting', {});
});

module.exports = router;
