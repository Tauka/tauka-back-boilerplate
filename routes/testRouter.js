var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var Test = require('../models/testModel');
var Verify = require('../verify');

router.use(bodyParser.json());
router.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Test.find({}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Test.create(req.body, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});


router.route('/:id')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Test.findById(req.params.id, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Test.findByIdAndUpdate(req.params.id, {
		$set: req.body
	}, {
		new: true
	}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Test.findByIdAndRemove(req.params.id, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
});

router.route('/student')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {
	Test.find({student: req.decoded._doc._id}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})

router.route('/student/:studentId')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Test.find({student: req.params.studentId}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
});




module.exports = router;
