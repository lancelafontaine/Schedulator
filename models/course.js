var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var course = new Schema({
	course_name: String,
	course_type: String,
	course_section: String,
	course_days: String,
	course_start-time: String,
	course_end-time: String,
	course_room: String,
	course_semester: String
});

module.exports = mongoose.model('courses', course);