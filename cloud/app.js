var express = require('express');
var moment = require('moment');
var _ = require('underscore');
var md5 = require('cloud/libs/md5.js');

var personsController = require('cloud/controllers/person.js');
var adminController = require('cloud/controllers/admin.js');
var postsController = require('cloud/controllers/posts.js');
var commentsController = require('cloud/controllers/comments.js');
var app = express();

var basicAuth = express.basicAuth('anilkaraka@outlook.com', 'test');

var userEmail = 'anilkaraka@outlook.com';
var userDisplayName = 'syllogismos';
var userDescription = 'lulzz';

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({keys: ["secret","keus2"], secret: "secret"}));
app.use(express.csrf());

app.locals._ = _;
app.locals.hex_md5 = md5.hex_md5;
app.locals.userEmail = userEmail;
app.locals.userDescription = userDescription;
app.locals.userDisplayName = userDisplayName;
app.locals.formatTime = function(time){
  return moment(time).format('MMMM Do YYYY, h:mm a');
};

app.locals.snippet = function(text, length){
  if (text.length < length) {
    return text;
  } else {
    var regEx = new RegExp("^.{" + length + "}[^ ]*");
    return regEx.exec(text)[0] + "...";
  }
};


// testing get, post VERBS
app.get('/hello', function(req, res) {
  res.render('hello', {token: req.session._csrf, message: 'Lel, you just set up your app!' });
});
app.get('/person', personsController.index);
app.post('/hello', function(req, res){
	res.render('hello', {token: req.session._csrf, message: req.body.message});
});

// admin requests
app.get('/admin', basicAuth, adminController.index);
app.get('/admin/comments', basicAuth, commentsController.index);

// posts requests
app.get('/posts', postsController.index);
app.get('/posts/new', basicAuth, postsController.new);
app.post('/posts', basicAuth, postsController.create);
app.get('/posts/:id', postsController.show);
app.get('/posts/:id/edit', basicAuth, postsController.edit);
app.put('/posts/:id', basicAuth, postsController.update);
app.del('/posts/:id', basicAuth, postsController.delete);


app.post('/posts/:post_id/comments', commentsController.create);
app.del('/posts/:post_id/comments/:id', basicAuth, commentsController.delete);

// Attach the Express app to Cloud Code.
app.listen();
