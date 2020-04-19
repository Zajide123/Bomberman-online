const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/newGame', (req, res, next) => {
  res.render('newGame',{pageTitle:'newGane'});
});
router.get('/createGame', (req, res, next) => {
  
});
  module.exports = router;