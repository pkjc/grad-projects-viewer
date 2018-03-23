var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/gradprojects';

var projectArray;
var user;
mongoClient.connect(url, function(err, client){
	if(err){
		return console.dir(err);
	}

	console.log("Connected Successfully to mongo server");
	var db = client.db('gradprojects');
	var query= {user:"rashmipethe"};
	db.collection('projects').find(query).toArray(function(err, result){
		if(err){
			throw err;
		}

		projectArray = result[0].project;
		var intLength = result.length;
		for (var i= 0; i < intLength ; i++) {
			var projects = result[i];
			console.log(projects.user);
			user = projects.user;
			var pLength = projects.project.length;
			
			for (var j = 0; j < pLength; j++) {
				
				console.log(projects.project[j].pname);
			}
			
		}
		
	});
	
	client.close();
});

router.get('/projectlist', function(req, res) {
	console.log("req received");
	console.log(req.query.name);
	mongoClient.connect(url, function(err, client){
		if(err){
			return console.dir(err);
		}
		var db = client.db('gradprojects');
		var query= {user:"rashmipethe"};
		console.log("connected again");
	});
	client.close();
	res.send("Ajax call success");
})

router.get('/', function(req, res){
	res.render('project', {user:user, list: projectArray});
});

module.exports = router;