'use strict';

const express = require('express');
const Profile = require('../models/Profile');

module.exports = function () {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      const profile = await Profile.create({
        ...req.body,
        image: 'image_example',
      });

      res.status(201).json(profile);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
