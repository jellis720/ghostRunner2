
//require packages
const express = require('express');
const exphbrs = require('express-handlebars');
const session = require('express-session');
// const routes = require('./routes/routes');
const flash = require('express-flash-messages');

//create express app
const app = express();

const bodyParser = require('body-parser');

//mongoose
const mongoose = require('mongoose');
const bluebird = require('bluebird');

//set mongoose promise library
mongoose.Promise = bluebird;

//define model
const User = require('./models/user');
const Snippet = require('./models/snippet');


//require passport
const passport = require('passport');

const loginRoutes = require('./routes/login');
const snippetsRoutes = require('./routes/snippets');
const searchRoutes = require('./routes/search');


let url = 'mongodb://localhost:27017/snippets';

//======BOILERPLATE======

//render templates
app.engine('handlebars', exphbrs());
app.set('views', './views');
app.set('view engine', 'handlebars');

//default session
app.use(
  session({
    secret: "cheeseburger",
    resave: false,
    saveUninitialized: true
  })
);

//tell app where to look for static content
app.use(express.static('public'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect passport to express
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//======== ENDPOINTS ========
//middleware to check for current user - if not, redirect to login
const requireLogin = (req, res, next) => {
  console.log(req.session);
  console.log('req.user', req.user);
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', requireLogin, (req, res) => {
    res.render('home', {user: req.user})
  });

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/registrationForm', (req, res) => {
  let user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.password);

  user.save()
  // if good
  .then(() => res.redirect('/'))
  //if bad
  .catch(err => console.log(err));
});

app.use('/', loginRoutes);
app.use('/', snippetsRoutes);
app.use('/', searchRoutes);

//connect app to mongoDB
mongoose.connect(url, (err, connection) => {
  if (!err){
    console.log('connected to mongo');
  }
  app.listen(3000, function() {
    console.log('Your app is running')
  });
});
