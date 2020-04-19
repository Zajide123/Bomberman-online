const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('login',{pageTitle:'Login'});
  });
router.post('/login',(req, res, next) => {
    console.log(req.body);
  res.redirect('/mainMenu');
  });
  module.exports = router;