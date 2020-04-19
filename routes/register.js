const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/register', (req, res, next) => {
  res.render('register',{pageTitle:'register'});
});
  module.exports = router;