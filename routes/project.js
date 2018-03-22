var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/gradprojects';

var projectArray;

mongoClient.connect(url, function(err, client){
	if(err){
		return console.dir(err);
	}

	console.log("Connected Successfully to mongo server");
	var db = client.db('gradprojects');
	var query= {user:"rashmipethe"}
	db.collection('projects').find(query).toArray(function(err, result){
		if(err){
			throw err;
		}
		var intLength = result.length;
		for (var i= 0; i < intLength ; i++) {
			var projects = result[i];
			console.log(projects.user);
			var pLength = projects.project.length;
			projectArray = projects.project;
			for (var j = 0; j < pLength; j++) {
				console.log(projects.project[j].pname);
			}
			
		}
		
	});
	
	client.close();
});


router.get('/', function(req, res){
	res.render('project');
});

module.exports = router;