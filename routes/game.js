
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/game', (req, res, next) => {
    res.render('index.html');
  });
  


  
  module.exports = router;