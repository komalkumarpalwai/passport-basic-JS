const express = require('express')
const passport=require('passport')
const localpassport=require('passport-local').Strategy
//mongoose
const User = require('./models/User');

const app = express()

//middleware:-a function that have the accessfor the requesting or responding to an object.it is also called as(req-res cycle).
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()} request made on url ${req.originalUrl}]`)
next();//it is a callback
}
// to use middleware on total application . we have to use [app.use(midleware function_name)]
app.get('/', logRequest,function (req, res) {
  res.send('Hello World')
})
//passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        try {
            const user=User.findOne({username:username})
            if(!username) return done(null,false({msg:'user not found'}))
            const ispassword=User.password===password
          if(ispassword) return done(null,user)
            else return done(null,false,({msg:"password doesn't matched"}))
        } catch (error) {
            return done(err)
        }
    }
  ));
app.get('/about', logRequest,function (req, res) {
    res.send('Hello World')
  })
app.listen(3000)