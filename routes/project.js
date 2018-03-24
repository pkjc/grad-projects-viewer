var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/gradprojects2';

var projectArray;
var user;
mongoClient.connect(url, function(err, client){
	if(err){
		return console.dir(err);
	}

	console.log("Connected Successfully to mongo server");
	var db = client.db('gradprojects2');
	var query= {userId:"rashmipethe"};
	db.collection('projects').find(query).toArray(function(err, result){
		if(err){
			throw err;
		}

		projectArray = result;
		user = projectArray[0].userId;
		var intLength = result.length;
		for (var i= 0; i < intLength ; i++) {
			var projects = result[i];
			console.log(projects.userId);
						
		}
		
	});
	
	client.close();
});

router.get('/projectdetails', function(req, res) {
	console.log("Request receieved: For project details");
	
	mongoClient.connect(url, function(err, client){
		if(err){
			throw err;
		}
		var username = req.query.name;
		console.log('Username:'+ username);
		var pname = req.query.pname;
		console.log('Project name:'+ pname);
	
		var dbconnect = client.db('gradprojects2');
		
		dbconnect.collection('projects').find({userId:username, pname:pname}).toArray(function(err, result){
			console.log(result);
			if(result.length === 0){
				var response = {"project":"Error"};
			} else{
				var response = {"project": result[0].pname, 
								"course": result[0].courseId,
								"abstract": result[0].abstract,
								"type": result[0].type
								};				
			}
			console.log('response' + response.project);	
				res.send(response);
		});		
	});
	
});

router.get('/', function(req, res){
	res.render('project', {user:user, list: projectArray});
});

module.exports = router;