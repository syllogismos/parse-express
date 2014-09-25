var _ = require('underscore');
var Person = Parse.Object.extend('Person');

// Display all posts
exports.index = function(req, res) {
	var query = new Parse.Query(Person);

	query.find().then(function(persons){
		res.render('persons', {
			persons: persons
		});
	},

	function(){
		res.send(500, 'Failed loading persons');
	});
}