var utility = require("./utility.js"); //store for functions not in the standard template

var DB = {}; //object to export that will contain all of the templated functions 

var password = '';
var username = '';
var	name = 'testage';
var callback = '';
var cookies = '';

DB.setup = function  (config) {
	var couch_host = 'http://' + '127.0.0.1' + ':' + '5984'
	DB.nano = require('nano')(couch_host)
	  , username = username
	  , userpass = password
	  , callback = '' // this would normally be some callback
	  , cookies  = {} // store cookies, normally redis or something
	  , database_name = name
},

DB.update = function  (newData, callback) {
	DB.setup();
	var client = DB.nano.use(database_name); //sets it to the right database
	if (newData.username === null){
		callback('user_not_found');
	}
	client.get(newData.username, function (e,r) {

		if(r === undefined) {
	    	callback('user_not_found');
	    	return;
	    }
	    for (var attrname in newData) { 
	    	r[attrname] = newData[attrname]; 
	    }
	    client.insert(r, r.username, function (e, r) {
    		if(e) {
    			callback(e);
    		} else {
    			callback(null,'ok'); //success!
    		}
		});
		callback(null,'ok');
	});
},

DB.insert = function  (record, callback) {
	DB.setup();
	var client = DB.nano.use(database_name); //sets it to the right database
	client.insert(record, record.username, function(e, body){
		if (e) { //if error means document already exists in database
			//console.log('...stuffInACouch.js: username already exists', e.message);
			callback('record_exists');
		} else {
			//console.log('...stuffInACouch.js: ', record.username, 'successfully created'); //success!
			callback(null,'ok');
		}
	});
},

DB.insertObj = function  (record, database, callback) {
	DB.setup();
	var client = DB.nano.use(('tutoring')); //sets it to the right database
	client.insert(record, function(e, body){
		if (e) { //if error means document already exists in database
			//console.log('...stuffInACouch.js: username already exists', e.message);
			callback('record_exists');
		} else {
			//console.log('...stuffInACouch.js: ', record.username, 'successfully created'); //success!
			callback(null,'ok');
		}
	});
},

//getByUsername
//in: username, callback 
DB.getByUsername = function  (user, callback) {
	DB.setup();
	var client = DB.nano.use(database_name); //sets it to the right database
	client.get(user, function (e,r) {
		if (e){
			console.log('...stuffInACouch.js: account ',e.error);
			callback('user_not_found',null);
		}
		else{
			callback(null,r);
		}
	});
},



//getByEmail
//in: username, callback 
DB.getByEmail = function  (email, callback) {
	DB.setup();
	var client = DB.nano.use(database_name); //sets it to the right database
	client.view('userAccount','email', {key: email}, function(e, r) { //checks to see if email is already registered
		if (r === null || r === undefined)
		{
			callback('user_not_found', null);
		}
		else if((r.rows).length === 0) //email already exists
		{
			callback('user_not_found',null);
		}
		else //email already exists
		{
			var id = r.rows[0].id;
			DB.getByUsername(id,callback); 
		};
	});
},

//getByEmail
//in: username, callback 
DB.getSkill = function  (skill, callback) {
	DB.setup();
	var client = DB.nano.use(database_name); //sets it to the right database
	client.view('skill','skills_mark', {descending: true},
					function(e, r) { //checks to see if email is already registered
					  	if (!e) {
							for (var i = r.rows.length - 1; i >= 0; i--) {
							    if (r.rows[i].value !== skill) { 
							        r.rows.splice(i, 1);
							    }
							    else
							    	console.log(r.rows[i].key);
							}
							console.log('getSkill');
					    	callback(null, r.rows);
					  	} else {
					  		callback(e);
					  	}
					});
},

DB.getClasses = function  (user, callback) {
	DB.setup();
	var client = DB.nano.use('tutoring'); //sets it to the right database
	client.view('class','user_class',
					function(e, r) { //checks to see if email is already registered
					  	if (!e) {
							for (var i = r.rows.length - 1; i >= 0; i--) {
							    if (r.rows[i].value !== user) { 
							        r.rows.splice(i, 1);
							    }
							}
							console.log(r.rows);
					    	callback(null, r.rows);
					  	} else {
					  		callback(e);
					  	}
					});
},

//sets up the Db 
DB.buildDB = function(callback) {
	DB.setup();
	DB.nano.db.create(database_name, function(err, body) {
		var client = DB.nano.use(database_name); //sets it to the right database
		if (err) {
			console.log('Warning: Database already exist !');
			utility.buildViews(client);
			callback(null);
		}
		else {
			console.log('...stuffInACouch: created database, loading views');
			utility.buildViews(client);
			callback(null);
		}
	});
},

DB.buildOtherDB = function(callback) {
	DB.setup();
	DB.nano.db.create('tutoring', function(err, body) {
		var client = DB.nano.use('tutoring'); //sets it to the right database
		if (err) {
			console.log('Warning: Database already exist !');
			callback(null);
		}
		else {
			console.log('...stuffInACouch: created database');
			callback(null);
		}
	});
},

//destroy the DB created by accountManager
DB.destroyDB = function(callback) { //because some men just want to watch the world burn
	DB.setup();
	DB.nano.db.destroy(database_name, function(err, body) {
		if (err) {
			console.log('...stuffInACouch: database not destroyed!' + err);
			//callback(err);
		}
		else {
			console.log('...stuffInACouch: destroyed database');
			//callback(null);
		}
	});
};

module.exports = DB;