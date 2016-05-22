/**
 * Routes file for Login
 */
var ejs = require("ejs");
var session = require('client-sessions');
var wordpress = require( "wordpress" );

exports.wordpress = function(req,res)
{
	console.log( "First Functions" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://cmpe272blog.wordpress.com/",
		username: "devanjal",
		password: "dsHARSAN@4"
	});

	client.getPosts(function( error, posts ) {
		console.log( "Results" + JSON.stringify(posts) + ":" );
        res.send({'result':posts});
	});}
exports.postword = function(req,res){
    var params = req.body;
    console.log(params['title']);
    var client = wordpress.createClient({
        url: "https://cmpe272blog.wordpress.com/",
        username: "devanjal",
        password: "dsHARSAN@4"
    });
    client.newPost({
        title: params['title'],
        content: params['content'],
        status: params['status'],
        name: params['name'],
        termNames: {
            "category": params['category'],
            "post_tag": params['post_tag']
        }

    }, function( error, data ) {
        console.log( arguments );
        res.send({'result':data});
    });}
exports.upload = function(req,res) {
   // console.log(req.files);
    console.log(req.files.file.name);
    console.log(req.files.file.type);
    console.log(req.files.file.path);
    var params = req.files;
    var client = wordpress.createClient({
        url: "https://cmpe272blog.wordpress.com/",
        username: "devanjal",
        password: "dsHARSAN@4"
    });

    var fs = require( "fs" );

    var filename = params['filename'];
    var file = fs.readFileSync(req.files.file.path);
    client.uploadFile({
        name: req.files.file.name,
        type: req.files.file.type,
        bits: file
    }, function (error, data1) {
        console.log(arguments);
        res.send({'result':data1});

    });
}

exports.manage = function(req,res){
    var params = req.body;
    console.log(params['title']);
    var client = wordpress.createClient({
        url: "https://cmpe272blog.wordpress.com/",
        username: "devanjal",
        password: "dsHARSAN@4"
    });
    client.editPost(id= params['id'], {
        title: params['title'],
        content: params['content'],
        status: params['status'],
        name: params['name'],
        termNames: {
            "category": params['category'],
            "post_tag": params['post_tag']
        }

    }, function( error, data2 ) {
        console.log( arguments );
        res.send({'result':data2});
    });}

exports.tags = function(req,res)
{var tagID = req.query.tagID;
    console.log(tagID  );
    // check user already exists
    var client = wordpress.createClient({
        url: "https://cmpe272blog.wordpress.com/",
        username: "devanjal",
        password: "dsHARSAN@4"
    });

    client.getPosts(name = tagID, function( error, posts1 ) {
        console.log( "Results " + JSON.stringify(posts1) + " :" );
        res.send({'result':posts1});
    });}


//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
