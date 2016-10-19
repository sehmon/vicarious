var express = require('express');
var http = require('http');
var app = express();

var urlString = "https://www.instagram.com/oauth/authorize/?client_id=73e5f31d13384082bc7f5b2cfc107c5d&redirect_uri=http://localhost:3000/auth&response_type=code"

app.get('/', function(req, res) {
  res.send("Hello World");
});

app.get('/login', function(req, res){
  res.redirect(urlString);
});

app.get('/auth', function(req, res){
  res.send(req.query.code);
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
