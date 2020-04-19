const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
router.get('/settings', (req, res, next) => {
  res.render('settings',{pageTitle:'settings'});
});
  module.exports = router;