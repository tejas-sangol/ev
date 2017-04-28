const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
var user = require("./database.js");
var password = fs.readFileSync("password").toString('utf-8').trim();
console.log(password);
module.exports = function(app)
{
  app.get("/",function(req,res)
  {
    res.sendFile(path.join(__dirname,"/views/index.html"))
  })
  app.get("/login",function(req,res)
  {
    res.sendFile(path.join(__dirname,"/views/login.html"))
  })

  app.post("/newData",function(req,res)
  {
    console.log(req.body)
    res.json(req.body)
    if(password === req.body.password)
    {
      user.create({
	key:uuid.v4(),
	name_ps:req.body.name_ps || "",
        id:req.body.id|| 0,
        timestamp:req.body.timestamp || 0,
        room : req.body.room || ""
      });
    }
  })

  app.post("/top10",function(req,res)
  {
    console.log(req.body)
    if( req.session.authenticated)
    {
      user.findAll({
        order:"timestamp DESC",
        limit:3,
      })
      .then(function(users)
      {
        return res.json({
          status:"success",
          users : users
        })
      })
      .catch(function(err)
      {
        return res.json({
          status:"fail",
          message:"Internal error"
        })
      })
    }
  })

  app.post("/query/:id",function(req,res)
  {
      if( req.session.authenticated)
      {
        user.findOne({
          where:{
            id:req.params.id
          },
          order:"timestamp DESC"
        })
        .then(function(user)
        {
          if(user) return res.json({
            status:"success",
            user:user
          })

          return res.json({
            status:"fail",
            user:"Id not found"
          })
        })
        .catch(function(err)
        {
          return res.json({
            status:"fail",
            message:"Internal error"
          })
        })
      }
  })

  app.post("/login",function(req,res)
  {
    console.log(req.body)
      if(req.body.username === "admin" && req.body.password === "admin")
      {
        req.session.authenticated = true;
        res.end();
      }
      console.log(req.session)
  })

  app.get('/logout',function(req,res)
  {
      req.session.destroy();
      console.log(req.session)
      res.redirect("/login");
  })
}
