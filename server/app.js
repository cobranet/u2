var express = require("./node_modules/express");
var path = require("path");
var app = express();
var port = 8080;

app.get("/", function(req, res){
    console.log(req);
    res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.use(express.static(path.join(__dirname,'../app')));
var http = require('http').Server(app);
http.listen(port);
