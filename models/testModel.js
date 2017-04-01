var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Test = new Schema ({
	name: String,
	student: Schema.Types.ObjectId,
	group: Schema.Types.ObjectId,
	score: Number
});


module.exports = mongoose.model('Test', Test);