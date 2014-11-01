
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// db
// var mongoUri = "mongodb://localhost/youtube";
// var mongoUri = process.env.MONGOLAB_URI ||
//                process.env.MONGOHQ_URL ||
//                "mongodb://localhost/youtube";
// var mongoose = require('mongoose');
// mongoose.connect(mongoUri);

// routing
var routes = {
    index:require('./routes/index.js'),
    v1: {
    	twitter:require('./routes/v1/twitter.js')
    }
};

app.get('/', routes.index.index);
app.get('/v1/twitter', routes.v1.twitter.get);
app.post('/v1/twitter', routes.v1.twitter.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


