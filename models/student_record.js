var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var student_record = new Schema({
    id: String,
    first_name: String,
    last_name: String,
    credits_completed: String
});

module.exports = mongoose.model('student_record', student_record);