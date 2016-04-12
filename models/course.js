var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//defining documents name such as username and password
var course = new Schema({
   course_name: String,
   type: String,
   sections:String,
   days:String,
   start:String,
   end:String,
   room:String,
   semester:String
});


module.exports = mongoose.model('course', course);



//var user = require('user');
//var section = require('section');
//var course = Object.create(user);
//course = {
  //// properties
  //courseCode: "",
  //name: "",
  //offeredDuringSemester: [],
  //credits: 0.0,
  //sections: section
  //prerequisites: [],
  //associatedSections: [],

  //// methods
  ////Returns list of the offered sections of a course
  //getAssociatedSection: function () {
    ////
  //},
  ////Used to get the list of the different times the sections are offered
  //listSectionTimes: function () {
    ////
  //},

  ////This method allows to get the time of a section
  //getSectionTime: function () {
    ////
  //}
  ////Returns the credits of a course
  //courseCredit: function () {
    ////
  //},
//}

//module.exports = course;
