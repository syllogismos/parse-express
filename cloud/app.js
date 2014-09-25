
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();
var http = require('http');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

//
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Lel, you just set up your app!' });
});

app.get('/person', function(req, res) {
  res.send("person object");
});

app.post('/hello', function(req, res){
	res.render('hello', {message: req.body.message});
});

// Attach the Express app to Cloud Code.
app.listen();
