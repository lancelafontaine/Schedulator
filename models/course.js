var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var course = new Schema({
    course_name: String,
    type: String,
    sections: String,
    days: String,
    start: String,
    end: String,
    room: String,
    semester: String
});

module.exports = mongoose.model('course', course);