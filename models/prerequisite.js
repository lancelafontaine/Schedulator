var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prerequisite = new Schema({
    course_name: String,
    course_description: String,
    credits: String,
    prerequisites: String,
    corequisites: String
});

//login_infos is the collections name
//we need to convert out our student_record Schema to a model
module.exports = mongoose.model('prerequisite', prerequisite);  
