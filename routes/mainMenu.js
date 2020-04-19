const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/mainMenu', (req, res, next) => {
    res.render('mainMenu',{pageTitle:'Page Not Found'});
  });
  module.exports = router;