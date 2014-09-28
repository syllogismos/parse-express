var _ = require('underscore');
var Post = Parse.Object.extend('Post');


// Display all posts
exports.index = function(req, res) {
	var query = new Parse.Query(Post);
	query.descending('createdAt');
	query.find().then(function(results){
		res.render('posts/index', {
			posts: results
		});
	},
	function(){
		res.send(500, 'failed loading posts');
	});
};

// Display a form for creating a new post.
exports.new = function(req, res){
	res.render('posts/new', {});
};

exports.create = function(req, res){
	var post = new Post();

	post.save(_.pick(req.body, 'title', 'body')).then(function(){
		res.redirect('/posts');
	},
	function(){
		res.send(500, 'Failed saving post');
	});
};

exports.show = function(req, res){
	var postQuery = new Parse.Query(Post);
	var foundPost;
	postQuery.get(req.params.id).then(function(post){
		if (post) {
			foundPost = post;
			var Comment = Parse.Object.extend('Comment');
			var commentQuery = new Parse.Query(Comment);
			commentQuery.equalTo('post', post);
			commentQuery.descending('createdAt');
			return commentQuery.find();
		} else {
			return [];
		}
	}).then(function(comments){
		res.render('posts/show', {
			post: foundPost,
			comments: comments
		});
	},
	function() {
		res.send(500, 'failed finding the specified post to show');
	});
};


exports.edit = function(req, res) {
	var query = new Parse.Query(Post);
	query.get(req.params.id).then(function(post) {
		if (post) {
			res.render('posts/edit', {
				post: post
			})
		} else {
			res.send('specified post does not exist');
		}
	},
	function() {
		res.send(500, 'failed finding post to edit');
	});
};

exports.update = function(req, res){
	var post = new Post();
	post.id = req.params.id;
	post.save(_.pick(req.body, 'title', 'body')).then(function(){
		res.redirect('/posts/' + post.id);
	},
	function(){
		res.send(500, 'failed saving post');
	});
};