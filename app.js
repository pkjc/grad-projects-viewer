var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var router = express.Router();
var alert = require('alert-node');

var routes = require('./routes/index');
var index = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/project');
var data = require('./routes/mongo');

var bodyParser = require('body-parser');

var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://swlp:csi5510@ds123399.mlab.com:23399/gradprojects');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var app = express();

// view engine setup
var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'dbexample.log'), {flags: 'a'})

//Configure Logging for the application
app.use(logger('dev', {stream: accessLogStream}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.use('/', routes);
app.use('/users', users);
app.use('/user', users);
app.use('/projects', projects);
app.use('/data',data);

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  // Connect Flash
  app.use(flash());

  // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.msg = 'Page not found. Resource may have been moved.';
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    err.msg = 'Internal Server Error.';
    res.status(err.status || 500);
    res.render('error');
});

//Add mongo connect object, use it when required
//var url = 'mongodb://swlp:csi5510@ds123399.mlab.com:23399/gradprojects';
//app.use(expressMongo('mongodb://swlp:csi5510@ds123399.mlab.com:23399/gradprojects'));
//mongo.connect(url, function(err, client){
//if(err){
  //    return console.log(err);
    //}
  //app.locals.db = client;
//});

module.exports = app;