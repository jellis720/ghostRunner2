const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const Snippet = require('../models/snippet');

routes.get('/profile', (req, res) => {
  Snippet.find({ userID: req.user.id })
    // then show my clubs
    .then(snippet => res.render('profile', { snippet: snippet }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});

routes.get('/snippetlist', (req, res) => {
  Snippet.find({ userID: req.user.id })
    // then show my clubs
    .then(snippet => res.render('snippetlist', { snippet: snippet }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});


//route to add new snippets to snippetlist
routes.get('/addsnippet', (req, res) => {
  if (req.query.id) {
    Snippet.findById(req.query.id)
      // render form with this club
      .then(snippet => res.render('addsnippet', { snippet: snippet }));
  } else {
    res.render('addsnippet');
  }
});

routes.post('/saveSnippet', (req, res) => {
  //edit snippet
  //set a random number as the ID
  //need to split array values into individual strings
  if (!req.body.id){
    req.body.id = new mongoose.mongo.ObjectID();
  }
  req.body.userID = req.user.id;
  Snippet.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
    .then(() => res.redirect('/snippetlist'))
    // catch validation errors
    .catch(err => {
      console.log(err);
      res.render('addsnippet', {
        errors: err.errors,
        snippet: req.body
      });
    });
});

routes.get('/deleteSnippet', (req, res) => {
  Snippet.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/snippetlist'));
});

module.exports = routes;
