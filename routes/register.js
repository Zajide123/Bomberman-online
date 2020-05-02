const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const User= require('../models/User');
const Score= require('../models/topScore');
const router = express.Router();
router.get('/register', (req, res, next) => {
  res.render('register',{pageTitle:'register'});
});
router.post('/signup',(req,res,next)=>{
const login = req.body.login;
const password= req.body.password;
//check if user exist
User.findByLogin(login).then(([rows,data]) =>{
  if (rows[0] ){
    console.log ( rows);
    return res.redirect('/register');
  }
  //if not create it
   new User(login,password)
  //create score for him
  User.findByLogin(login).then(([a,b])=>{
   const id=a[0].user_id;
    score= new Score(id,0,0,0);
    console.log('score je : '+score);
  })

  
  res.redirect('/');

}).catch();

})
  module.exports = router;
