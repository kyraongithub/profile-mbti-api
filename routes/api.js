'use strict';

const express = require('express');

module.exports = function () {
  const router = express.Router();

  router.use('/profiles', require('./profiles')());
  router.use('/users', require('./users')());
  router.use('/comments', require('./comments')());

  return router;
};
