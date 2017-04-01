var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Group = new Schema ({
	students: {
		type: [Schema.Types.ObjectId],
		default: []
	},
	name: String,
	instructor: String,
	price: Number
});


module.exports = mongoose.model('Group', Group);