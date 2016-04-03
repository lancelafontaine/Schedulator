var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


//defining documents name such as username and password
var login_info = new Schema({
    username: String,
    password: String
});

//this is where the the username and password gets hashed
login_info.plugin(passportLocalMongoose);
//login_infos is the collections name
//we need to convert out our login_info Schema to a model
module.exports = mongoose.model('login_infos', login_info);