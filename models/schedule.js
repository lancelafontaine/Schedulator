//var user = require('user');
var schedule = Object.create(user);
schedule = {
  // properties
  registeredCourses: [],
  academicYear: "",
  academicTerm: [],
  semester: [],

  
  // methods
  //Displays the selected schedule
  displaySchedule: function () {
    //
  },

  //Displays the student's degree progression chart
  getCourses: function () {
    //
  },

  //Verifies if there is an available time slot in the selected schedule at the specified time
  isAvailableAt: function () {
    //
  }

  //Returns a list of all the avaialble times between courses in form of string
  listAvailableTimes: function () {
    //
  },

  //Allows to add a course in the schedule
  addCourse: function () {
    //
  },

  //Returns the total number of credits taken in a semester according to list of courses in the schedule
  numCreditsTakenInSchedule: function () {
    //
  }
}

module.exports = schedule;