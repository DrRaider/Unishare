exports.requireLogin = function requireLogin (req, res, next) {
  if (!req.user) {
    console.log("requirelogin");
    res.redirect('/sign-in');
  } else {
    next();
  }
};

exports.requireNotLogin = function requireLogin (req, res, next) {
  if (req.user) {
    console.log("requirenotlogin");
    res.redirect('/profile');
  } else {
    next();
  }
};