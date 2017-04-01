var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var Group = require('../models/groupModel');
var mongoose = require('mongoose');
var Verify = require('../verify');

router.use(bodyParser.json());
router.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.find({}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.create(req.body, function(err, group) {
		if (err) throw err;

		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('Added new group!');
	})
});


router.route('/:id')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.findOne({_id: req.params.id}, function(err, group) {
		if (err) throw err;
		res.json(group);
	})
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.findByIdAndUpdate(req.params.id, {
		$set: req.body
	}, {
		new: true
	}, function(err, group) {
		if (err) throw err;
		res.json(group);
	})
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.findByIdAndRemove(req.params.id, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});

router.route('/group/:id/students')

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.findById(req.params.id, function(err, group) {
		if (err) throw err;

		let students = req.body.students.map((id) => {
			return mongoose.Types.ObjectId(id);
		});

		group.students = [...group.students, ...students];

		group.save(function (err, group) {
			if (err) throw err;
			res.json(group);
		});
	});
})

router.route('/group/student')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {
	Group.find({student: req.decoded._doc._id}, function(err, group) {
		if (err) throw err;
		res.json(resp);
	});
});

router.route('/group/:id/students/:studentId')

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Group.findById(req.params.id, function(err, group) {
		if (err) throw err;

		group.students.splice(group.students.indexOf(mongoose.Types.ObjectId(req.params.studentId)), 1);

		group.save(function (err, group) {
			if (err) throw err;
			res.json(group);
		});
	});
})


module.exports = router;
