'use strict';

const request = require('supertest');
const app = require('../app');

describe('Profile', () => {
  let profileId;

  it('should create a profile via API', async () => {
    const res = await request(app).post('/api/profiles').send({
      name: 'Test Profile',
      mbti: 'INTJ',
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Profile');
    expect(res.body.image).toBeDefined();

    profileId = res.body._id;
  });

  it('should render profile page', async () => {
    const res = await request(app).get(`/profile/${profileId}`);

    expect(res.status).toBe(200);
    expect(res.text).toContain('Test Profile');
    expect(res.text).toContain('MBTI');
  });

  it('should return 404 for non-existent profile', async () => {
    const res = await request(app).get('/profile/64b000000000000000000000');

    expect(res.status).toBe(404);
  });
});
