var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var router = express.Router();
var alert = require('alert-node');


mongoose.connect('mongodb://arun:6054@ds121599.mlab.com:21599/gpv-db');

var Schema = new mongoose.Schema({
    pname    :{type: String, required: true} ,
	abs: {type: String, required: true},
  course   :{type: String, required: true},
  type : {type: String, required: true}
});
router.get('/data', function(req, res){
    res.render('add');
  });
var project = mongoose.model('projectdetails', Schema);

router.post('/db', function(req, res){
 //validation
  var pname = req.body.pname;
  var abs = req.body.abs;
  var course = req.body.course;
  var type = req.body.type;
  req.checkBody('pname', 'project Name is required').notEmpty();
	req.checkBody('abs', 'abstract is required').notEmpty();
	req.checkBody('course', 'course is required').notEmpty();
  req.checkBody('type', 'type is required').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    alert(JSON.stringify(errors));
    res.render('add.html');
  }
  else{
       project.findOne({pname: pname, abs: abs, course: course, type: type},function(err,name){
if(name){
  return  alert('Project exsist');
  res.render('add.html');
}
else{
 //insert to db
 new project({
    pname    : req.body.pname,
    abs: req.body.abs,
    course   : req.body.course,
    type   : req.body.type
}).save(function(err, doc){
    if(err){
        res.json(err);
    }
    else {
        res.redirect('/projects');
        alert('Successfully inserted!');
    }
});
}
});
  }
});

module.exports = router;
