var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.get('/', function(req, res){
	res.send('Helllo There');
})

app.listen(3000, function(){
	console.log('Server started at port 3000');
})