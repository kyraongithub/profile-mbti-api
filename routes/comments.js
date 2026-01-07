'use strict';

const express = require('express');
const Comment = require('../models/Comment');

module.exports = function () {
  const router = express.Router();

  function serializeComment(comment, userId) {
    const obj = comment.toObject();

    obj.likeCount = obj.likes.length;
    obj.isLikedByUser = userId
      ? obj.likes.some((id) => id.toString() === userId)
      : false;

    delete obj.likes;
    return obj;
  }

  router.post('/', async (req, res, next) => {
    try {
      const comment = await Comment.create({
        content: req.body.content,
        user: req.body.userId,
        parent: req.body.parentId || null,
      });

      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  });

  router.post('/:id/like', async (req, res, next) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

      const comment = await Comment.findById(req.params.id);
      if (!comment) return res.status(404).send('Comment not found');

      if (!comment.likes.some((id) => id.toString() === userId)) {
        comment.likes.push(userId);
        await comment.save();
      }

      res.json(comment);
    } catch (err) {
      next(err);
    }
  });

  router.post('/:id/unlike', async (req, res, next) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

      const comment = await Comment.findById(req.params.id);
      if (!comment) return res.status(404).send('Comment not found');

      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
      await comment.save();

      res.json(comment);
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const { sort, userId } = req.query;

      const query = {};
      if (userId) query.user = userId;

      let mongoQuery = Comment.find(query).populate('user');

      if (sort === 'newest') {
        mongoQuery = mongoQuery.sort({ createdAt: -1 });
      }

      if (sort === 'most_liked') {
        mongoQuery = mongoQuery.sort({ 'likes.length': -1 });
      }

      const comments = await mongoQuery;
      res.json(
        comments.map((comment) => serializeComment(comment, req.query.userId))
      );
    } catch (err) {
      next(err);
    }
  });

  return router;
};
