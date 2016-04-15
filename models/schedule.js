var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schedule = new Schema({
    student_id: String,
    schedule_json: String,
});

module.exports = mongoose.model('schedule', schedule);