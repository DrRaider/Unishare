var AM = require('./models/accountManager.js');


function getTutor(callback) {
    var config = require('./models/config.json');
    AM.setup(config, function (e, o) {
        if (e)
            callback(e);
        else
            callback(null, 'ok');
    });
}

// student = session user username
function createClass(student, data, callback) { 

}

module.exports = {getTutor: getTutor};