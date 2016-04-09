var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining documents name such as username and password
var course = new Schema({
   course_name: String,
   type: String,
   Tut:String,
   days:String,
   start:String,
   end:String,
   room:String,
   semester:String
});


module.exports = mongoose.model('course', course);