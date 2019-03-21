// TODO Make as a class
const EventEmitter = require('events').EventEmitter;
const util = require('util');
const moment = require('moment');
const Twitter = require('twitter');
const Sentiment = require('sentiment');
const debug = require('debug')('bitgo:TweetStream');

const tp = require('./lib/TweetProcessing');
const config = require('../config');

const sentiment = new Sentiment();
const twitter = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

function TweetStream() {
  const self = this;
  EventEmitter.call(this);

  const params = {
    track: config.keywords.join(',')
  };

  // The update object we send to the client
  this.updates = {};

  // Subscribe to a stream of data from twitter's API
  twitter.stream(config.stream_path, params, stream => {
    // TODO: Worry about back-pressure
    stream.on('data', data => {
      // Ignore rate limiting messages for now
      if (data.limit) {
        return;
      }
      const fullText = tp.getFullText(data);
      if (fullText === undefined) {
        console.error('Unable to find the full text', data);
      }
      const result = sentiment.analyze(fullText);
      config.keywords.forEach(key => {
        if (tp.wordInText(key, fullText)) {
          self.updates[key] = {
            key,
            count: self.updates[key] ? self.updates[key].count + 1 : 1,
            score: self.updates[key]
              ? self.updates[key].score + result.score
              : result.score
          };
        }
      });
    });

    stream.on('error', error => {
      throw error;
    });
  });

  this.updateClient = () => {
    const time = moment();
    Object.keys(this.updates).forEach(key => {
      this.updates[key].time = time;
    });
    if (Object.keys(this.updates).length > 0) {
      debug('Emitting data', this.updates);
      this.emit('data', this.updates);
    }
    this.updates = {};
    setTimeout(this.updateClient, config.update_interval);
  };

  this.updateClient();
}

util.inherits(TweetStream, EventEmitter);

module.exports = new TweetStream();
