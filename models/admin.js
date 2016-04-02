//var couseCatalog = require('courseCatalog');
//var user = require('user');
var admin = Object.create(user);
admin = {
  // properties
  firstName: "",
  lastName: "",
  adminID: 0,
  //databaseModel: courseCatalog,
  listOfOfferedCourses: [],
  
  // methods

  //Displays the list of courses from the course catalogue object which represents the engineering sequence
  viewCourses: function () {
    //
  },

  //Allows an admin to modify the engineering sequence by removing a course
  removeCourse: function () {
    //
  },

  //Allows an admin to modify the course sequence by adding a course or adding a section to an exsiting course
  addCourse: function () {
    //
  }
}

module.exports = admin;