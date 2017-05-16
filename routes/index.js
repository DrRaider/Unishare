var express = require('express')
	, router = express.Router()
	, signup = require('../public/js/passport/signup')
	, update = require('../public/js/passport/update')
	, findTutor = require('../public/js/tutoring');

var isAuthenticated = function(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	console.log('welcome');
	res.redirect('/sign-in');
}

var isNotAuthenticated = function(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (!req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	console.log('oops');
	res.redirect('/profile');
}

module.exports = function(passport) {

	router.get('/', function(req, res, next) {
		res.render('templates/default.jade', {
			title: 'Home'
		})
	})

	router.get('/profile', isAuthenticated, function(req, res, html) {
		res.render('templates/profile.jade', {
			basedir: './views/templates',
			user: req.user
		})
	});

	router.get('/sign-up', isNotAuthenticated, function(req, res, html) {
		res.render('templates/sign-up.jade', {
			title: 'Sign Up'
		})
	});

	router.get('/sign-in', isNotAuthenticated, function(req, res, html) {
		res.render('templates/sign-in.jade', {
			title: 'Sign In'
		})
	});

	router.get('/forgot-password', isNotAuthenticated, function(req, res, html) {
		res.render('templates/forgot-password.jade', {
			title: 'Forgot password'
		})
	});

	router.get('/blog-home', isAuthenticated, function(req, res, html) {
		res.render('templates/blog-home.jade', {
			basedir: './views/templates',
			title: 'Blog'
		})
	});

	router.get('/find-tutor',isAuthenticated, function(req, res, html) {
		findTutor.getClasses(req.user.username, function(e, o) {
			if (e)
				console.log("err");
			else {
				console.log("gotcha");	
				res.render('templates/find-tutor.jade', {
					basedir: './views/templates',
					title: 'Find tutor',
					classes: o
				});
			}
		});
	});

	router.get('/welcome', isNotAuthenticated, function(req, res, html) {
		res.render('templates/welcome.jade', {
			title: 'sign Up'
		})
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/sign-in');
	});

	router.post('/register', function (req, res, html) {
		signup.createUser(req.body, function (e, r) {
			if (e)
				console.log("err");
		});
		res.redirect("/welcome");
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/sign-in'
	}));

	router.post('/update', function (req, res, html) {
		update.update(req.body, function (e, r) {
			if (e)
				console.log("err");
			else
				console.log("updated");	
		});
		res.redirect("/profile");
	});

	router.post('/search-tutors', isAuthenticated, function(req, res, html) {
		findTutor.getTutor(req.body.skill, function(e, r) {
			if(e)
				console.log(e);
			else {
				console.log('res : ');
				findTutor.getClasses(req.user.username, function(e, o) {
					if (e)
						console.log("err");
					else {
						console.log("gotcha");	
						res.render('templates/find-tutor.jade', {
							basedir: './views/templates',
							title: 'Find tutor',
							classes: o,
							find: r
						});
					}
		});
			}
		});
	});

	router.post('/ask', isAuthenticated, function(req, res, html) {
		findTutor.createClass(req.user.username, req.body.prof, req.body.skill, function(e, o) {
			if (e)
				console.log('error:', e);
			else
				console.log("ggggggggggggggggggggggggg");
			res.redirect('/find-tutor');
		});
	});

	return router;
}
//zdazdqd