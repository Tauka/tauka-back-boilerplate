var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/userModel');
var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());