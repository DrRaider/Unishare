var LocalStrategy   = require('passport-local').Strategy;
var AM = require('../models/accountManager.js');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
			usernameField: 'username',
            passwordField: 'user_password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
        	console.log(req.body);
            findOrCreateUser = function(){
				var config = require('../models/config.json');
				AM.setup(config, console.log); //setup builds the database
				AM.signup(req.body, 
					function(err, user) {
	                    // In case of any error, return using the done method
	                    if (err){
	                        console.log('Error in SignUp: ' + err);
	                        return done(err);
	                    }                     
	                    if (user) {
							AM.update(req.body, function(e, r) {
								if (e) {
									return done(e);
				                } else {
									console.log('User Registration succesful');    
	                        		return done(null, r);	
	                        	}
	                        });			                
	                	} else {
	                        console.log('User Registration succesful');    
	                        return done(null, user);
	                    }
	                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
}