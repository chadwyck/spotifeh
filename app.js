/*
 * Module dependencies
 */
var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')

var app = express()
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib())
}
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.bodyParser());
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(stylus.middleware(
	{ src: __dirname + '/public'
	, compile: compile
	}
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	res.render('index',
		{ title : 'Home'}
	)
})

require('./routes').route(app);

var a = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});