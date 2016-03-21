//var user = require('user');
//var student = require('student');
var studentRecord = Object.create(user);
studentRecord = {
  // properties
  student: student,
  completedCourses: [],
  
  // methods

  //Returns the list of courses completed by the student
  getCourses: function () {
    //
  },

  //Displays the student's degree progression chart
  viewProgressionChart: function () {
    //
  },

  //Checks if a course has prerequisites
  hasPrerequisite: function () {
    //
  }

  //Allows to add a completed course to the student academic history
  addCompletedCourse: function () {
    //
  },

  //Allows to remove a completed course from the student record
  removeCompletedCourse: function () {
    //
  },

  //Update modifications made to the record. Returns true if successful
  update: function () {
    //
  }
}

module.exports = studentRecord;