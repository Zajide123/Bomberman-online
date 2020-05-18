const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const User= require('../models/User');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login',{pageTitle:'Login'});
  });
router.post('/login',(req, res, next) => {
  
const login = req.body.login;
 const password= req.body.password;
User.findByLogin(login).then(([rows,data])=>{
  if(!rows[0])
  {
    return res.redirect('/')
  };
  if(rows[0].password=password)
  {
    req.session.user=rows[0];
    req.session.isLoggedIn=true;
    return req.session.save(()=>{
     res.redirect('/mainMenu');
    })
    }

})  });

  module.exports = router;