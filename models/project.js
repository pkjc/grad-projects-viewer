var mongoose = require('mongoose');
var app = require('../app');

//Project Schema
var projectSchema = new mongoose.Schema({
	pname : {type : String, trim : true},
	courseId : {type : String, trim : true},
	abstract : {type : String, trim : true},
	pType : {type : String, trim : true},
	userName : {type : String, trim : true}
});

var Project = module.exports = mongoose.model('Project', projectSchema);

module.exports.getProjectByNameAndUser = function(pname, userName, callback) {
	console.log('Inside Model' + pname +'--->'+ userName);
	Project.findOne({pname: pname, userName: userName}, callback);
}

module.exports.getProjectsByUser = function(userName, callback){
	console.log('Inside Model' + userName);
	//var query = {userName: userName};
	Project.find({userName: userName}, callback);
}
