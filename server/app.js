var PATH_TO_LIB = "./node_modules/";
var express = require("./node_modules/express");
var cookieParser = require('./node_modules/cookie-parser');
var SignedRequest = require(PATH_TO_LIB + 'facebook-signed-request');

var path = require("path");
var app = express();
var port = 5000;



var FACEBOOK_APP_ID = '2028912550667185';
var FACEBOOK_SECRET = '840475cf8bf4e7afb10142c3b24b84eb';


SignedRequest.secret = '840475cf8bf4e7afb10142c3b24b84eb';
app.get("/", function(req, res){
    console.log(req);
    res.sendFile(path.join(__dirname, '../app/index.html'));
});


app.use(express.static(path.join(__dirname,'../app')));
app.use(express.static(path.join(__dirname,'../app/images/sites')));
app.use(express.static(path.join(__dirname,'../app/images/constructs')));
app.use(express.static(path.join(__dirname,'../modelsjs')));
app.use(express.static(path.join(__dirname,'../app/pages')));






app.get('/mygame',
	function(req, res){
	    console.log(req);
	    var rc = req.headers.cookie;
	    console.log(rc);
	    var list = [];
	    if (rc) {
		rc.split(';').forEach(function( cookie ) {
		    var parts = cookie.split('=');
		    list[parts.shift().trim()] = decodeURI(parts.join('='));
		});
	    }
	    var signed = list['fbsr_' + FACEBOOK_APP_ID];
	    var s;
	    new SignedRequest(signed).parse(function(errors,request){
		 console.log(request.isValid());
		 s = request.isValid();
		// access errors
		console.log(errors);
		
		// this is your data object
		console.log(request.data);
	    });
	    res.setHeader('Content-Type', 'application/json');
	    res.send(JSON.stringify({ a: s }));
  });




var http = require('http').Server(app);
http.listen(port);
console.log("Listen on port: " + port);
