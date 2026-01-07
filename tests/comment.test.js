'use strict';

const request = require('supertest');
const app = require('../app');

describe('Comments API', () => {
  let userId;
  let commentId;

  beforeAll(async () => {
    const userRes = await request(app)
      .post('/api/users')
      .send({ name: 'Comment User' });

    userId = userRes.body._id;
  });

  it('should create a comment', async () => {
    const res = await request(app).post('/api/comments').send({
      content: 'First comment',
      userId,
    });

    expect(res.status).toBe(201);
    expect(res.body.content).toBe('First comment');
    expect(res.body.user).toBe(userId);

    commentId = res.body._id;
  });

  it('should like a comment', async () => {
    const res = await request(app)
      .post(`/api/comments/${commentId}/like`)
      .send({ userId });

    expect(res.status).toBe(200);
    expect(res.body.likes.length).toBe(1);
  });

  it('should not duplicate likes', async () => {
    const res = await request(app)
      .post(`/api/comments/${commentId}/like`)
      .send({ userId });

    expect(res.body.likes.length).toBe(1);
  });

  it('should unlike a comment', async () => {
    const res = await request(app)
      .post(`/api/comments/${commentId}/unlike`)
      .send({ userId });

    expect(res.body.likes.length).toBe(0);
  });

  it('should reply to a comment', async () => {
    const res = await request(app).post('/api/comments').send({
      content: 'Reply comment',
      userId,
      parentId: commentId,
    });

    expect(res.status).toBe(201);
    expect(res.body.parent).toBe(commentId);
  });

  it('should get comments sorted by newest', async () => {
    const res = await request(app).get('/api/comments?sort=newest');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get comments sorted by most liked', async () => {
    await request(app).post(`/api/comments/${commentId}/like`).send({ userId });

    const res = await request(app).get('/api/comments?sort=most_liked');

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('likeCount');
  });

  it('should filter comments by user', async () => {
    const res = await request(app).get(`/api/comments?userId=${userId}`);

    expect(res.status).toBe(200);
    res.body.forEach((comment) => {
      expect(comment.user._id || comment.user).toBe(userId);
    });
  });
});
