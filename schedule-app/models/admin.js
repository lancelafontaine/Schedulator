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
  viewCourses: function () {
    //
  },
  removeCourse: function () {
    //
  },
  addCourse: function () {
    //
  }
}

module.exports = admin;