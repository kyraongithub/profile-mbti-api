'use strict';

const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('John Doe');
    expect(res.body._id).toBeDefined();
  });

  it('should fail when name is missing', async () => {
    const res = await request(app).post('/api/users').send({});

    expect(res.status).toBe(500); // mongoose validation
  });
});
