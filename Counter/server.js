// require my modules
// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");

var session = require("express-session");

var bodyParser = require('body-parser');

// create the express app
var app = express();
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'Kaka', // it doesn't matter what this is
  resave: false,
  saveUninitialized: true //make sure this is added - this is new
}))
// static content

//app.use(express.static(path.join(__dirname, "./static")));
 //setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  if('count' in req.session){
    req.session.count++;
  }else {
    req.session.count = 1;
  }
  return res.render('index', { session: req.session})
})

app.get('/reset', function(req, res){
  req.session.count = 0;
  return res.redirect('/');
})
app.get('/timesTwo',function(req, res) {
  req.session.count +=1;
  return res.redirect('/');
})



// keep this section at the bottom of the server file

app.listen(8000, function() {
    console.log("listening on port 8000.....");
  });

