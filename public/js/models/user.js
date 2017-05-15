AM = require('./accountManager.js');

function exist(username, callback) {
	var config = require('./config.json');
	AM.setup(config, console.log);
	AM.getByUsername(username, function  (e,o) {
		if (o){
			callback(null,o);
		}	else {
			callback('user_not_found', false);
		}
	});
}
module.exports = {
					exist: exist
				 };