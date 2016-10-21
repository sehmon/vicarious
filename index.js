var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var api = require('instagram-node').instagram();

var app = express();
app.use(cookieParser());

api.use({
  client_id: "73e5f31d13384082bc7f5b2cfc107c5d",
  client_secret: "1863b9b34a964298a3a0656b0af37ac7"
});

redirect_uri = "http://localhost:3000/auth"


exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};
 
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      api.use({access_token: result.access_token});
      res.cookie('access_token', result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize 
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/auth', exports.handleauth);

app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies);
  res.send("Hello World");
});

app.get('/user', function(req, res) {
  api.user('1823162936', function(err, result, remaining, limit){
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
