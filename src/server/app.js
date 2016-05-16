'use strict';

/*
	Load Modules
*/

var express = require('express'),
	path = require('path'),
	fs	 = require('fs');

var favicon = require('serve-favicon'),
	logger  = require('morgan'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	cors = require('cors'),
	errorHandler = require('./routes/error/errorHandler')();

var app = express(),
	routes;

var environment = process.env.NODE_ENV,
	port = process.env.PORT || 3007,
	db_url = process.env.MONGODB_DB_URL || "mongodb://127.0.0.1:27017/simpleserver";

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);

console.log('Ready to Start the Server');
console.log('PORT: ' + port);
console.log('environment: ' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});