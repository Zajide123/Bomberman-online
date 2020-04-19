const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/score', (req, res, next) => {
  res.render('score',{pageTitle:'score'});
});
  module.exports = router;