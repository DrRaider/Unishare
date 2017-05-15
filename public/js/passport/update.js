var AM = require('../models/accountManager.js');


function update(data, callback) { 
    AM.update(data, function(err, user) {
            // In case of any error, return using the done method
            if (err) {
                console.log("error while updating");
                callback(e);
            }
            // User and password both match, return user from done method
            // which will be treated like success
           callback(null, data);
    });   
}

module.exports = {update: update};