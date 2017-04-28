const express = require('express');
var app = express();
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const path = require('path');
var user = require("./database.js")
var session = require("express-session");
const fs = require('fs');
var password = fs.readFileSync("password").toString('utf-8').trim();


app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cookie_parser());
app.use(session({
  key: 'ssid',
  secret: 'fnwenvejnerw',
  resave: true,
  saveUninitialized: true
}))


// Redirect to login
app.use(function(req,res,next)
{
  console.log(req.method,req.url)
  if(req.body.password === password)return next();
  if(req.session.authenticated != true && req.path==='/')
  {
    res.redirect("/login")
  }
  else next();
})




app.use(express.static(path.join(__dirname , "views")))

//Add routes
require("./routes.js")(app);

app.listen(9000,function(err)
{
  if(err) console.log(err);
  else console.log("Listening at port 9000...")
});
