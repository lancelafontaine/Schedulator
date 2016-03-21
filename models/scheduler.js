//var user = require('user');
//var student = require('student');
//var courseCatalog = require('courseCatalog');
//var preference = require('preference');
var scheduler = Object.create(user);
scheduler = {
  // properties
  student: student,
  coursesToBeCompleted: [],
  courseCatalog: courseCatalog,
  coursesToBeCompleted: [],

  
  // methods

  //Used to display the course catalog
  displayCourseCatalog: function () {
    //
  },

  //This method is used to get the list of completed courses
  getAllCompletedCourses: function () {
    //
  },

  //Allows to find the courses that still need to be completed by the student
  getCoursesToBeCompleted: function () {
    //
  }

  //Allows to filter the courses by the set preferences
  filterByPreference: function () {
    //
  },

  //Method to generate the schedule
  generateSchedule: function () {
    //
  },

  //Verifies if a student has set his preferences
  isPreferences: function () {
    //
  }

  //Specifies the semester at which the generator starts generating schedules
  generateFrom: function() {
    //
  }
}

module.exports = studentRecord;