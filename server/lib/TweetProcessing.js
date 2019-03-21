/*
 * Since there are a couple of different ways to get the full text of a tweet.
 * Currently handles tweets, retweets, and quoted tweets
 */
const getFullText = tweet => {
  if (tweet.extended_tweet) {
    return tweet.extended_tweet.full_text;
  }

  if (tweet.retweeted_status) {
    if (tweet.retweeted_status.extended_tweet) {
      return tweet.retweeted_status.extended_tweet.full_text;
    }
    return tweet.retweeted_status.text;
  }

  if (tweet.quoted_status) {
    return tweet.quoted_status.text;
  }

  return tweet.text;
};

const wordInText = (word, text) => {
  lowerWord = word.toLowerCase();
  lowerText = text.toLowerCase();
  return lowerText.indexOf(`${lowerWord}`) !== -1;
};

module.exports = {
  getFullText,
  wordInText
};
