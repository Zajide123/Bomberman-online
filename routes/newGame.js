const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/newGame', (req, res, next) => {
  res.render('newGame',{pageTitle:'newGane', isLogedIn:req.isLoggedIn});
});
router.get('/createGame', (req, res, next) => {
  
});
router.post('/logout',(req, res, next) => {
  req.session.destroy(()=>{
    res.redirect('/');
  })
})
  module.exports = router;