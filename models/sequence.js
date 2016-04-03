var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//course sequence schema 
var course_sequence = new Schema ({

	course_name: String,
	type: String,
	sections: String,
	days: String,
	start: String,
	end: String,
	room: String, 
	semester: String

});

//exporting course sequence

module.exports = mongoose.model('courses', course_sequence);