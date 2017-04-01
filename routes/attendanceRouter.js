var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var Attendance = require('../models/attendanceModel');
var Verify = require('../verify');
var helpers = require('../helpers');

router.use(bodyParser.json());
router.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Attendance.find({}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Attendance.findOneAndUpdate({day: helpers.getToday()}, {
		$set: req.body
	}, {
		new: true
	}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});


router.route('/:id')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Attendance.findById(req.params.id, function(err, att) {
		if (err) throw err;
		res.json(att);
	})
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Attendance.findByIdAndUpdate(req.params.id, {
		$set: req.body
	}, {
		new: true
	}, function(err, att) {
		if (err) throw err;
		res.json(att);
	})
});

router.route('/student')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {
	Attendance.find({student: req.decoded._doc._id}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});

router.route('/student/:studentId')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Attendance.find({student: req.params.studentId}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	let today = req.query.day != undefined ? helpers.getToday(parseInt(req.query.day)) : helpers.getToday();
	console.log(today);

	Attendance.findOneAndUpdate({day: today, student: req.params.studentId}, {
		$set: req.body
	}, {
		new: true
	}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});


module.exports = router;
