var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var login_info = new Schema({
    username: String,
    password: String
});

// This is where the the username and password gets hashed
login_info.plugin(passportLocalMongoose);

module.exports = mongoose.model('login_infos', login_info);