const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin');

router.get('/allPosts', requireLogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .then(posts => {
      res.json({ posts })
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/createPost', requireLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body || !photo) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo,
    postedBy: req.user
  })

  post.save().then(result => {
    res.json({ post: result });
  })
    .catch(err => {
      console.log(err);
    })
})

router.get('/myPosts', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then(myPosts => {
      res.send({ myPosts })
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;