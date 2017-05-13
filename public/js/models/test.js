var bcrypt = require('bcrypt');
var should = require('should');

AM = require('./accountManager.js');

function register(data) {	
	var config = require('./config.json');
	AM.setup(config, console.log); //setup builds the database
	AM.signup(data, console.log);
}

function update(data) {
	AM.update(data, console.log);
}

function login(data, callback) {
	console.log(data.username);
	AM.manualLogin(data.username, data.user_password, function (e, o) {
		if (o) {
			//add session
			callback(null, o);
		}
	});
}

function exist(data, callback) {
	var config = require('./config.json');
	AM.setup(config, console.log);
	AM.getByUsername(data.username, function (e, o) {
		if (o) {
			//add session
			callback(null, o);
		}
	});
}

module.exports = {
					register: register,
					update: update,
					login: login,
					exist: exist
				 };