var bcrypt = require('bcrypt')
// use moment.js for pretty date-stamping //
var moment = require('moment');

var DB = {};	
var AM = {}; 


AM.setup = function  (config,callback) {
	DB = require('./databaseMiddleware/couchDB/stuffInACouch.js');
	//In the odd case this is our first time running the Setup. Lets try and build the DB!
	DB.buildDB(callback);
}

// logging in //
AM.getByUsername = function  (user,callback) {
	DB.getByUsername(user,function  (e,o) {
		if (o){
			callback(null,o);
		}	else {
			callback('user_not_found', false);
		}
	})
}

AM.getByEmail = function  (email,callback) {
	DB.getByEmail(email,function  (e,o) {
		if (o){
			callback(null,o);
		}	else {
			callback('email_not_found', false);
		}
	})
}

AM.autoLogin = function(user, user_password, callback)
{
	DB.getByUsername(user, function  (e,o) {
		if (o){
			o.user_password === user_password ? callback(null,o) : callback('invalid_password', false);
		}	else {
			callback('user_not_found', false);
		}
	})
}

AM.manualLogin = function(user, user_password, callback)
{
	console.log("manualLogin");
	var config = require('./config.json');
	AM.setup(config, console.log);
	DB.getByUsername(user,function  (e,o) {

		if (o === null || o == undefined || e === 'user_not_found')
		{
			callback("user_not_found", false)
		}
		else {
			bcrypt.compare(user_password, o.user_password, function(e, r) {
				if (r){
					callback(false, o);
				}	else {
					callback("invalid_password", false);
				}
			});
		}

	})
}

AM.signup = function(newData, callback)
{
	DB.getByUsername(newData.username, function  (e,r) { //tests to see if the user is already listed in the database
		if (e === 'user_not_found'){ //username not found
			DB.getByEmail(newData.email, function (e,r){ //tests to see if the email is already in the database
				if (r === null){ //  email not found
					var temp = 'org.couchdb.user:' + newData.username;
					newData._id = temp;
					AM.saltAndHash(newData.user_password, function(hash){
						newData.user_password = hash;
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						DB.insert(newData,function  (e) {
							callback(e);
						});
					});
				}
				else { 
					callback('Error: Email already taken', r);
				}
			});
		}
		else {
			callback('Error: Username already taken', r);
		}
	});
};

AM.update = function(newData, callback)
{
	var config = require('./config.json');
	AM.setup(config, console.log);
	if (newData.hasOwnProperty('user_password')) {
		AM.saltAndHash(newData.user_password, function(hash){
			newData.user_password = hash;
		});
	} else {
		console.log(newData);
		DB.update(newData, function(e, r) {
				if (e) {console.log("newData");
					callback('Error updating user: ' + e);
				} else {

					callback(null, 'ok');
				}
			});


	}
};

AM.setPassword = function(email,newPass, callback)
{
	DB.getByEmail(email, function (e,r){ //tests to see if the email is already in the database
		if (r){ //  email found
			AM.saltAndHash(newPass, function(hash){
				r.user_password = hash;
				DB.update(r,function  (e) {
					callback(e);
				});
			});
		}
		else { 
			callback('email_not_found');
		}
	});
}

AM.validateLost = function(email, passHash, callback)
{
	DB.getByEmail(email, function (e,r){ //tests to see if the email is already in the database
		if (e){ //  email found
			callback(e);
		}
		else { 
			r.user_password === passHash ? callback(null,r) : callback("invalid");
		}
	});
}

AM.saltAndHash = function(pass, callback)
{
	 bcrypt.genSalt(10, function(err, salt) {
	 	bcrypt.hash(pass, salt, function(err, hash) {
	 		callback(hash);
	 	});
	 });
}

AM.delete = function(id, callback)
{

}

//debug fuctions

AM.buildDB = function(callback)
{
	DB.buildDB(callback)
}

AM.destroyDB = function(callback)
{
	DB.destroyDB(callback)
}

module.exports = AM;
