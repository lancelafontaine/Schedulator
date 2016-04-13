var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pref = new Schema({
   student_id: String,
   pref_json: String,
});


module.exports = mongoose.model('pref', pref);
