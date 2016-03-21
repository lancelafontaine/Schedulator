//var user = require('user');
//var section = require('section');
var course = Object.create(user);
course = {
  // properties
  courseCode: "",
  name: "",
  offeredDuringSemester: [],
  credits: 0.0,
  sections: section
  prerequisites: [],
  associatedSections: [],
  
  // methods

  //Returns list of the offered sections of a course
  getAssociatedSection: function () {
    //
  },
  //Used to get the list of the different times the sections are offered
  listSectionTimes: function () {
    //
  },

  //This method allows to get the time of a section
  getSectionTime: function () {
    //
  }

  //Returns the credits of a course
  courseCredit: function () {
    //
  },
}

module.exports = course;