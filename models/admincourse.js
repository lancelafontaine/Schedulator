var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining documents name such as username and password
var admincourse = new Schema({
   course_name: String,
   type: String,
   sections:String,
   days:String,
   start:String,
   end:String,
   room:String,
   semester:String
});


module.exports = mongoose.model('admincourse', admincourse);
