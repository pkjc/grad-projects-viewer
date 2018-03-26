var express = require('express');
var router = express.Router();
var app = require('../app');

var Project = require('../models/project');

//Router to get projects corresponding to logged in user.
router.get('/', function(req, res){
	var projectArray;
	//var curSession = req.session;
	//var user = curSession.user;
	//const db = req.app.locals.db;
	
	//console.log("Connected Successfully to mongo server");
	//const dbo = db.db("gradprojects");
	//var userName = user.username;
	var userName = "rashmipethe";
	//var query = {userName:userName};
	Project.getProjectsByUser(userName,function(err, result){
		console.log('inside the project query' + result);

		if(err){
			console.error(err);
			throw err;
		} else if(result.length === 0){
			var errorMsg = {msg : "No projects added. To add, click on Add new project option below."};
			res.render('project', {user:userName, errorMsg : errorMsg})
		} else{
			projectArray = result;
			//user = projectArray[0].userName;
			res.render('project', {user:userName, list: projectArray});
		}
	});
	
});

//Router to get the project details for project name.
router.get('/projectdetails', function(req, res) {
	console.log("Request receieved: For project details");
	var username = req.query.name;
	console.log('Username:'+ username);
	var pname = req.query.pname;
	console.log('Project name:'+ pname);

	Project.getProjectByNameAndUser(pname, username, function(err, project){
		console.log(project);
		if(err){
			console.error(err);
			throw err;
		} else if(project === 'undefined' || project === null){
			console.log(project);
			var response = {"project":"Error"};
		} else{
			var response = {"project": project.pname, 
							"course": project.courseId,
							"abstract": project.abstract,
							"type": project.pType
							};				
		}
		console.log('response' + response.project);	
		res.send(response);
	});		
});

router.get('/add', function(req, res){
	console.log('here to add project');
	res.render('add');
});

module.exports = router;