
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();
var Backbone = require('cloud/backbone.js');
var $ = require('cloud/jquery.js');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body



var Persons = Backbone.Collection.extend({
	url: 'http://backbonejs-beginner.herokuapp.com/users'
});

var Person = Backbone.Model.extend({
	urlRoot: "http://backbonejs-beginner.herokuapp.com/users"
});


// 50.63.202.59



// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Lel, you just set up your app!' });
});

app.get('/person', function(req, res) {
  var persons = new Persons();
  persons.fetch({
  	success: function(persons){
  		res.render('person', { persons: persons });
  	}
  });
});

app.post('/hello', function(req, res){
	res.render('hello', {message: req.body.message});
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
