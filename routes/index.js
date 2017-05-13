var express = require('express')
  , router = express.Router()
  , user = require('../public/js/models/test.js')
  , auth = require('./post.js');

router.get('/', function (req, res, next) {
  res.render('templates/default.jade', { title: 'Home' })
})

router.get('/profile', function (req, res, html) {
  req.session = 
    { _id: 'Nicolas',
      _rev: '1-de50e8a394e02b95322dece2eae80384',
      username: 'Nicolas',
      last_name: 'SAILLY',
      promotion: '2019',
      age: '23',
      nationality: 'France',
      email: 'nsailly@live.fr',
      date: 'May 10th 2017, 8:15:54 pm'
    };
  res.render('templates/profile.jade', { basedir : './views/templates', session: req.session })
});

router.get('/sign-up', function (req, res, html) {
  res.render('templates/sign-up.jade', { title: 'Sign Up' })
});

router.get('/sign-in', function (req, res, html) {
  res.render('templates/sign-in.jade', { title: 'Sign In' })
});

router.get('/forgot-password', function (req, res, html) {
  res.render('templates/forgot-password.jade', { title: 'Forgot password' })
});

router.get('/blog-home', function (req, res, html) {
  req.session = 
    { _id: 'Nicolas',
      _rev: '1-de50e8a394e02b95322dece2eae80384',
      username: 'Nicolas',
      last_name: 'SAILLY',
      promotion: '2019',
      age: '23',
      nationality: 'France',
      email: 'nsailly@live.fr',
      date: 'May 10th 2017, 8:15:54 pm'
    };
    console.log(req.session);
  res.render('templates/blog-home.jade', { basedir : './views/templates', title: 'Blog' })
});

router.get('/find-tutor', function (req, res, html) {
  req.session = 
    { _id: 'Nicolas',
      _rev: '1-de50e8a394e02b95322dece2eae80384',
      username: 'Nicolas',
      last_name: 'SAILLY',
      promotion: '2019',
      age: '23',
      nationality: 'France',
      email: 'nsailly@live.fr',
      date: 'May 10th 2017, 8:15:54 pm'
    };
    console.log(req.session);
  res.render('templates/find-tutor.jade', { basedir : './views/templates', title: 'Find tutor' })
});

router.get('/welcome', function (req, res, html) {
  res.render('templates/user.jade', { title: 'sign Up' })
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

router.post('/sign-up', function (req, res, html) {
  user.register(req.body)
  res.send(req.body);
});

router.post('/profile', function (req, res, html) {
  user.login(req.body,  function (e, o) {
    if (o) {
      //add session
      req.session.user = o;
      console.log(req.session.user);
      res.redirect('/profile');
    } else {
      console.log("invalid email/pasword");
      res.render('templates/sign-in.jade', { error: 'Invalid email or password.' });
    }
  });
});

module.exports = router;
