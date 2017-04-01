var User = require('./models/userModel');
var Attendance = require('./models/attendanceModel');
var schedule = require('node-schedule');

var dailyAttendance = schedule.scheduleJob('* 0 0 * *', function() {
	User.find({
		role: "student"
	}, 
	'_id', 
	function(err, students) {
		students.map((student) => {
			Attendance.create({
				student: student.id
			});
		});
	});
})

