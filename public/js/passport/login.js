var LocalStrategy = require('passport-local').Strategy;
var AM = require('../models/accountManager.js');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'user_password',
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in couchDB if a user with username exists or not
            AM.manualLogin(username, password,
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err) {
                        console.log("err while login", err);
                        return done(null, false, err);
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );   
}