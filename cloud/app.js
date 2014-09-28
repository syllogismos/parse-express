var express = require('express');
var moment = require('moment');
var _ = require('underscore');
var md5 = require('cloud/libs/md5.js');

var personsController = require('cloud/controllers/person.js');
var adminController = require('cloud/controllers/admin.js');
var app = express();

var basicAuth = express.basicAuth('anilkaraka@outlook.com', 'test');

var userEmail = 'anilkaraka@outlook.com';
var userDisplayName = 'syllogismos';
var userDiscription = 'lulzz';

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.locals._ = _;
app.locals.hex_md5 = md5.hex_md5;


// testing get, post VERBS
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Lel, you just set up your app!' });
});
app.get('/person', personsController.index);
app.post('/hello', function(req, res){
	res.render('hello', {message: req.body.message});
});

// admin get requests
app.get('/admin', basicAuth, adminController.index);

// Attach the Express app to Cloud Code.
app.listen();
