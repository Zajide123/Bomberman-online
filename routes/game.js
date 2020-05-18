
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const Setings=require('../models/setings');
const router = express.Router();
router.get('/game', (req, res, next) => {
  if(req.session.isLoggedIn){
  const id = req.session.user.user_id;
  Setings.findById(id).
  then(([rows,data])=>{
    if (!rows[0] ){
      res.render('game.ejs',{id:id,
        music:1,
        sounds:100,
        isLoggedIn:req.session.isLoggedIn
        });
    }
    else{
      res.render('game.ejs',{id:id,
      music:rows[0].volume,
      sounds:rows[0].sounds,
      isLoggedIn:req.session.isLoggedIn
      });
   
    ;}
  })
  .catch(err=>{console.log(err)});
}
    
    else{
      res.render('game.ejs',{
        id:'id',
        isLoggedIn:false,
        music:1,
        sounds:100,
      });} 
  });
  


  
  module.exports = router;