var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseprereq = new Schema({
    course_name: String,
    course_description: String,
    credits: String,
    taken: String
});

module.exports = mongoose.model('courseprereq', courseprereq);