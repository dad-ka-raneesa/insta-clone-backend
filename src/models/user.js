const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/dpyrkn5yy/image/upload/v1600959797/noprofile_tx1ugu.jpg"
  },
  followers: [
    { type: ObjectId, ref: 'User' }
  ],
  following: [
    { type: ObjectId, ref: 'User' }
  ],
});

mongoose.model('User', userSchema);