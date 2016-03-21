//var user = require('user');
// Preferences class?
// Course class?

var student = Object.create(user);
student = {
  firstName: "",
  lastName: "",
  studentID: 0,
  Schedules: [],
  // properties
  Preferences: {},
  record: [{},{},],

  // methods

  //Displays the schedule
  viewSchedule: function () {
    //
  },

  //To modify the student's preferences of an indicated semester
  modifyPref: function () {
    //
  },

  //Returns the list of all completed courses
  getallCompletedCourses: function () {
    //
  },

  //Instantiate the request to generate schedule
  getSchedule: function() {
    //
  },

  //This method verifies if a student has the prerequisites require to take "course" parameter
  hasPrerequisite: function() {
    //
  },

  //Allows the student to add a course to his schedule
  addCourseToSchedule: function () {
    //
  },

  //Displays the Software Engineering course sequence with a highlight of the courses that the student has already completed
  viewEngineeringSequence: function () {
    //
  },

  //Displays the student's information(first and last name, id, email)
  studentInfo: function () {
    //
  },

  //Displays the student's academic record
  viewRecord: function () {
    //
  }
}

module.exports = student;