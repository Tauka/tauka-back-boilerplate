var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var Money = require('../models/moneyModel');
var Verify = require('../verify');

router.use(bodyParser.json());
router.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Money.find({}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Money.create(req.body, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});


router.route('/:id')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Money.findById(req.params.id, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Money.findByIdAndUpdate(req.params.id, {
		$set: req.body
	}, {
		new: true
	}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Money.findByIdAndRemove(req.params.id, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
});

router.route('/:userId')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {
	Money.find({user: req.decoded._doc._id}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	})
})



module.exports = router;
