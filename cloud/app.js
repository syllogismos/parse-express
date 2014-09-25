var express = require('express');
var moment = require('moment');
var _ = require('underscore');
var md5 = require('cloud/libs/md5.js');

var personsController = require('cloud/controllers/person.js')

var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.locals._ = _;
app.locals.hex_md5 = md5.hex_md5;

app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Lel, you just set up your app!' });
});

app.get('/person', personsController.index);

app.post('/hello', function(req, res){
	res.render('hello', {message: req.body.message});
});

// Attach the Express app to Cloud Code.
app.listen();

/*
Update failed with Could not load triggers.  The error was Error: Uncaught Synta
xError: Unexpected token ) in controllers/person.js:8
    at app.js:6:25
    at main.js:1:1
Deploying recent changes.
*/