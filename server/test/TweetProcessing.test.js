const assert = require('assert');
const tp = require('../lib/TweetProcessing');

describe('Tweet Processing', () => {
  it('should return a word is part of the full text', () => {
    const fullText =
      '@KoinBulteni Ayı sezonundaki zararımı 2 haftada burada çıkardım.Bitcoin ile kaldıraçlı forex işlemi yaptırıyorlar. Referans linkimden kayıt olup bana destek olur musun? Senin yorumun nedir burası ile ilgili üstad? https://t.co/DJU1XCCKrN';
    const word = 'bitcoin';
    assert(tp.wordInText(word, fullText));
  });

  it('should be able to get the full text of various tweet types', () => {
    const tweet = {
      text: 'text'
    };
    const extendedTweet = {
      text: 'text',
      extended_tweet: {
        full_text: 'extendedTweet'
      }
    };
    const retweet = {
      text: 'text',
      retweeted_status: {
        text: 'retweet'
      }
    };
    const quotedTweet = {
      text: 'text',
      quoted_status: {
        text: 'quotedTweet'
      }
    };

    const quotedExtendedTweet = {
      text: 'text',
      quoted_status: {
        text: 'quotedTweet'
      },
      extended_tweet: {
        full_text: 'quotedExtendedTweet'
      }
    };

    assert.equal('text', tp.getFullText(tweet));
    assert.equal('retweet', tp.getFullText(retweet));
    assert.equal('quotedTweet', tp.getFullText(quotedTweet));
    assert.equal('extendedTweet', tp.getFullText(extendedTweet));
    assert.equal('quotedExtendedTweet', tp.getFullText(quotedExtendedTweet));
  });
});
