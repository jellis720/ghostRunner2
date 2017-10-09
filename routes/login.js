// PACKAGES
const express = require('express');
const routes = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//BOILERPLATE

//configure passport
passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log('configuing passport');

    User.authenticate(username, password)
      // success!
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, null, { message: 'No user found.'});
        }
      })
      // in case of problem
      .catch(err => done(err));
  })
);

//store the user's id in the session
passport.serializeUser(function(user, done) {
  // console.log('serializeUser');
  done(null, user.id);
});

//get the user from the session based on ID
passport.deserializeUser(function(id, done) {
  // console.log('deserializeUser');
  User.findById(id).then(user => done(null, user));
});


//======== LOGIN =========

// local login form
routes.get('/login', (req, res) => {
  res.render('login', {failed: req.query.failed});
});

// endpoint for local login sumbit
routes.post('/loginForm', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?failed=true',
  failureFlash: true
}));

// log out
routes.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = routes;
