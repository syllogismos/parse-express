
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();
// var Parse = require('cloud/parse.js');
var Backbone = require('cloud/backbone.js');
var http = require('http');

var $ = require('cloud/jquery.js');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// $.ajaxSetup({
//   headers: {
//     'X-Parse-REST-API-Key': 'Uesoyqsm9GjPCfnNzDsMTFhFXaB34QFXIwdje96C',
//     'X-Parse-Application-Id': 'w2akEFYvsfFnLYro0PVaH2phaoK50n97pNuvFV4T'
//   }
// });

// var Persons = Backbone.Collection.extend({
// 	url: 'https://api.parse.com/1/classes/Person'
// });

// var Person = Backbone.Model.extend({
// 	urlRoot: "https://api.parse.com/1/classes/Person"
//   // className: "Person"
// });
//-

// 50.63.202.59



// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.

app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Lel, you just set up your app!' });
});

app.get('/person', function(req, res) {
  res.send("person object");
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
