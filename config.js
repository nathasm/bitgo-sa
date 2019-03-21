module.exports = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  update_interval: 500,
  stream_path: 'statuses/filter',
  keywords: [
    'twitter',
    'facebook',
    'google',
    'travel',
    'art',
    'music',
    'photography',
    'love',
    'fashion',
    'food'
  ]
};
