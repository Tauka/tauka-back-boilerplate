var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var User = require('../models/userModel');
var Verify = require('../verify');

router.use(bodyParser.json());



/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	User.find({}, function(err, user) {
		if (err) throw err;

		return res.status(200).json(user);

	});
});

router.post('/register', function(req,res) {
	User.register(new User ({username: req.body.username}),
		req.body.password, function(err, user) {
			if (err) {
				return res.status(500).json({err: err});
			}

			user.role = req.body.role;


			if(req.body.firstname) {
				user.firstname = req.body.firstname;
			}

			if(req.body.lastname) {
				user.lastname = req.body.lastname;
			}

			
			user.save(function(err, user) {
				passport.authenticate('local')(req, res, function () {
					return res.status(200).json({status: 'Registration Successful!'});
				})
			});
		});
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.status(401).json({
				err: info
			});
		}

		req.logIn(user, function(err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
		

			console.log('User in users: ', user);

			var token = Verify.getToken(user);

			res.status(200).json({
				status: 'Login successful!',
				success: true,
				token: token
			});
		});
	})(req, res, next);
});

router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	User.findByIdAndRemove(req.params.id, function(err, resp) {
		if (err) throw err;
		res.json(resp);
	});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.status(200).json({
		status: 'Bye!'
	});
});


module.exports = router;
