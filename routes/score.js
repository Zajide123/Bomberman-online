const path = require('path');

const express = require('express');
const TopScore=require('../models/topScore');

const router = express.Router();
router.get('/score', (req, res, next) => {
  if(!req.session.isLoggedIn){
    return res.redirect('/')
  }
  const id =  req.session.user.user_id;
  TopScore.findById(id).
  then(([rows,data])=>{
    console.log(rows);
    res.render('score',{pageTitle:'score',
    score:rows
  });
  })
  .catch(err=>{console.log(err)});
  
});
  module.exports = router;