var login = require('./login');
var signup = require('./signup');
var update = require('./update');
var User = require('../models/user');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ', user.username);
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        User.exist(username, function(err, user) {
            console.log('deserializing user:', user.username);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and Updating
    login(passport);
}