'use strict';

const express = require('express');
const Profile = require('../models/Profile');
const seedProfile = require('../db/seed');

module.exports = function () {
  const router = express.Router();

  router.get('/profile/:id', async (req, res, next) => {
    try {
      await seedProfile();

      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).send('Profile not found');

      res.render('profile_template', { profile });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
