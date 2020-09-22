const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGOURI } = require('../keys');

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('Connected with mongo');
});

mongoose.connection.on('error', (err) => {
  console.log('err in connecting', err);
})

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

module.exports = { app };