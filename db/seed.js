'use strict';

const Profile = require('../models/Profile');

async function seedProfile() {
  const count = await Profile.countDocuments();
  if (count > 0) return;

  await Profile.create({
    name: 'A Martinez',
    description: 'Adolph Larrue Martinez III.',
    mbti: 'ISFJ',
    enneagram: '9w3',
    variant: 'sp/so',
    tritype: 725,
    socionics: 'SEE',
    sloan: 'RCOEN',
    psyche: 'FEVL',
    temperaments: 'Balanced',
    image: 'image_example',
  });
}

module.exports = seedProfile;
