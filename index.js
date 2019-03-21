const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const tweetStream = require('./server/TweetStream');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', socket => {
  tweetStream.on('data', data => {
    io.emit('data', data);
  });
});

io.listen(9001);
app.listen(9000);
