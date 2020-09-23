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

module.exports = router;