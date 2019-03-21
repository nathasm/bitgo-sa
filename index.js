const express = require('express');
const path = require('path');
const app = express();
const socketIO = require('socket.io');
const tweetStream = require('./server/TweetStream');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 9000;
}
const server = app.listen(port);

const io = socketIO(server);
io.on('connection', socket => {
  tweetStream.on('data', data => {
    io.emit('data', data);
  });
});
