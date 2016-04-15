var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courses_completed = new Schema({
    course_id: String,
    student_id: String,
    course_name: String,
    credits: String
});

module.exports = mongoose.model('courses_completed', courses_completed);