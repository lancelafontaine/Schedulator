var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prerequisite = new Schema({
    course_name: String,
    course_description: String,
    credits: String,
    prerequisites: String,
    corequisites: String
});

module.exports = mongoose.model('prerequisite', prerequisite);