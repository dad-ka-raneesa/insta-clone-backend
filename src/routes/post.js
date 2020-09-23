const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/allPosts', requireLogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .then(posts => {
      res.json({ posts })
    })
    .catch(err => console.log(err))
})


router.get('/followingPosts', requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .then(posts => {
      res.json({ posts })
    })
    .catch(err => console.log(err))
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
    .catch(err => console.log(err))
})

router.get('/myPosts', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then(myPosts => {
      res.send({ myPosts })
    })
    .catch(err => console.log(err))
})

router.post('/like', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $push: { likes: req.user._id }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  })
})

router.post('/unLike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: req.user._id }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  })
})

router.post('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId, {
    $push: { comments: comment }
  }, { new: true })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .exec((err, result) => {
      console.log(result);
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    })
})

router.delete('/deletePost/:postId', requireLogin, (req, res) => {
  console.log("delete");
  console.log("params", req.params.postId);
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err || 'No post by this id' })
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post.remove()
          .then(result => {
            res.json(result)
          })
          .catch(err => console.log(err))
      }
    })
})

module.exports = router;