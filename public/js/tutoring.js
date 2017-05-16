var AM = require('./models/accountManager.js');


function getTutor(skill, callback) {
    AM.getSkill(skill, function (e, o) {
        if (e)
            callback(e);
        else {
            for(var i = 0; i < o.length; i++) {
                o[i].key[0] = Math.floor(Number(o[i].key[0])/4);
                o[i].key[1] = Math.floor(Number(o[i].key[1]));
            }
            console.log(o);
            callback(null, o);
        }
    });
}

// student = session user username
function createClass(user, prof, skill, callback) {
    var data = {
        username: user,
        teacher: prof,
        skills: skill 
    }
    AM.buildDB(console.log);
    AM.insertObj(data, 'tutoring', function (e, o) {
        if (e)
            callback(e);
        else
            callback(null, 'ok');
    });
}

function getClasses(user, callback) {
    AM.getClasses(user, function (e, o) {
        if (e)
            callback(e);
        else {
            console.log(o);
            callback(null, o);
        }
    });
}

module.exports = {
    getTutor: getTutor,
    createClass: createClass,
    getClasses: getClasses
};
