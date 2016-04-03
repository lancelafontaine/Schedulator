var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courses_completed = new Schema({
    course_id: String,
    student_id: String,
    course_name: String,
    credits: String
});

//login_infos is the collections name
//we need to convert out our student_record Schema to a model
module.exports = mongoose.model('courses_completed', courses_completed);  
