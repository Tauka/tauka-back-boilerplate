var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var helpers = require('../helpers');

var Attendance = new Schema ({
	student: Schema.Types.ObjectId,
	attended: {
		type: String,
		default: "absent"
	},
	day: {
		type: String,
		default: helpers.getToday()
	}
});


module.exports = mongoose.model('Attendance', Attendance);