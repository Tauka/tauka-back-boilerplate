var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema ({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	role: String,
	money: Number
});

User.methods.getName = function() {
	return (this.firstname + '' + this.lastname)
};


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);