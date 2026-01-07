'use strict';

const express = require('express');
const User = require('../models/User');

module.exports = function () {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
      });

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
