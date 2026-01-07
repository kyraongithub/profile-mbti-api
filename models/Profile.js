'use strict';

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: Number,
    socionics: String,
    sloan: String,
    psyche: String,
    temperaments: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
