var AM = require('../models/accountManager.js');

function createUser(data, callback) {
	var config = require('../models/config.json');
	AM.setup(config, console.log); //setup builds the database
	AM.signup(data, 
		function(err, user) {
			// In case of any error, return using the done method
			if (err && user){
				AM.update(data, function(e, r) {
						if (e) {
							callback(e);
						} else {
							console.log('User Registration succesful');    
							callback(null, r);	
						}
					});	
			} else if (err) {
				console.log('Error in SignUp: ' + err);
				callback(err);		                
			} else {
				console.log('User Registration succesful');    
			callback(null, user);
			}
		});
	};


module.exports = {createUser: createUser};