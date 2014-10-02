var _ = require('underscore');
var Comment = Parse.Object.extend('Comment');

exports.index = function(req, res) {
	var query = new Parse.Query(Comment);
	query.descending('createdAt');
	query.find().then(function(results){
		res.render('comments/index', {comments: results});
	},
	function() {
		res.send(500, 'failed loading comments');
	});
};

exports.create = function(req, res) {
	var comment = new Comment();
	var Post = Parse.Object.extend('Post');
	var post = new Post();
	post.id = req.params.post_id;
	comment.set('post', post);

	comment.save(_.pick(req.body, 'author', 'author_email', 'body')).then(function() {
		res.redirect('/posts/' + req.params.post_id);
	},
	function() {
		res.send(500, 'failed saving comment');
	});
}

exports.delete = function(req, res) {
	var comment = new Comment();
	comment.id = req.params.id;
	comment.destroy().then(function() {
		res.redirect('/posts/' + req.params.post_id);
	},
	function() {
		res.send(500, 'Failed deleting comment');
	});
}