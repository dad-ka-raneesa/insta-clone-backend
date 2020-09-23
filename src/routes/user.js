const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

router.get('/userProfile/:userId', requireLogin, (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-password")
    .then(user => {
      Post.find({ postedBy: req.params.userId })
        .populate("populatedBy", '_id name')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          return res.json({ user, posts });
        })
    })
    .catch(err => {
      return res.status(404).json({ error: "User not found" });
    })
})

router.post('/follow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {
    $push: { followers: req.user._id }
  }, { new: true },
    (err, followedUser) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(req.user._id, {
        $push: { following: req.body.followId }
      }, { new: true })
        .select("-password")
        .then(followingUser => {
          res.json({ followedUser, followingUser });
        })
        .catch(err => {
          res.status(422).json({ error: err });
        })
    })
})

router.post('/unFollow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.unFollowId, {
    $pull: { followers: req.user._id }
  }, { new: true },
    (err, unFollowedUser) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(req.user._id, {
        $pull: { following: req.body.unFollowId }
      }, { new: true })
        .select("-password")
        .then(unFollowingUser => {
          res.json({ unFollowedUser, unFollowingUser });
        })
        .catch(err => {
          res.status(422).json({ error: err });
        })
    })
})

module.exports = router;