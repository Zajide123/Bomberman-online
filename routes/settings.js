const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const Setings=require('../models/setings');

const router = express.Router();

router.get('/settings', (req, res, next) => {
  if(!req.session.isLoggedIn){
    return res.redirect('/')
  }
  const id =  req.session.user.user_id;
  Setings.findById(id).
  then(([rows,data])=>{
    if (!rows[0] ){
      new Setings(id,50,50);
      console.log(rows);
    res.render('settings',{pageTitle:'settings',
    score:rows})
    }
    else{
    console.log(rows);
    res.render('settings',{pageTitle:'score',
    score:rows
  });}
  })
  .catch(err=>{console.log(err)});
  
});
router.post('/settings',(req,res,next)=>{
  const music=req.body.music;
  const sounds=req.body.sounds;
  const id =  req.session.user.user_id;
    Setings.update(id,music,sounds);
    res.redirect('/mainMenu');
  
  })

  module.exports = router;