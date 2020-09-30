const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
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

require('./src/models/user');
require('./src/models/post');

app.use(express.json());
app.use(require('./src/routes/auth'));
app.use(require('./src/routes/post'));
app.use(require('./src/routes/user'));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

module.exports = { app };