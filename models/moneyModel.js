var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Money = new Schema ({
	user: Schema.Types.ObjectId,
	value: Number,
	purpose: String
});


module.exports = mongoose.model('Money', Money);