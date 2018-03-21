var express = require('express');
var app = express();

var mongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/gradprojects';

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
			for (var j = 0; j < pLength; j++) {
				console.log(projects.project[j].pname);
			}
			
		}
		
	});
	
	client.close();
});

var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

const path = require('path');
const VIEWS = path.join(__dirname, '../views');
console.log(VIEWS);

app.get('/', function(req, res){
	res.sendFile('./project.html', {root:VIEWS});
});

app.listen(3000, function(){
	console.log('Server is listening at port 3000');
});