var User = require('./models/userModel');
var jwt = require('jsonwebtoken');
var config = require('./config.js');

exports.getToken = function (user) {
	return jwt.sign(user, config.secretKey, {
		expiresIn: 3600
	}); 
};

exports.verifyOrdinaryUser = function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {

		//verifies secret and checks up
		jwt.verify(token, config.secretKey, function (err, decoded) {
			if (err) {
				var err = new Error('You are not authenticated!');
				err.status = 401;
				return next(err);
			} else {
				//if everything is good, save to other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {

		//if there is no token
		//return an error
		var  err = new Error('No token provided!');
		err.staus = 403;
		return next(err);
	}
};

exports.verifyAdmin = function(req, res, next) {
	
	if (req.decoded._doc.role == "admin")
	{
		return next();
	}
	else {
		var err = new Error('You\'re not admin')
		err.status = 403;
		next(err);
	}
}