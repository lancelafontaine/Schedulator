var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var student_record = new Schema({
    id: String,
    first_name: String,
    last_name: String,
    credits_completed: String
});

//login_infos is the collections name
//we need to convert out our student_record Schema to a model
module.exports = mongoose.model('student_record', student_record);  
  /*
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
*/