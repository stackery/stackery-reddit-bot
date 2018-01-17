const Snoowrap = require('snoowrap');
const logger = require('./logger.js');

const subreddits = ['cooking'];

const r = new Snoowrap({
  userAgent: 'reddit-bot-example-node',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

function logic (post) {
  return r.getSubmission(post.name).fetch()
    .then((submission) => {
      if (submission.num_comments > 50) {
        const message = {
          title: submission.title,
          link: submission.permalink,
          text: submission.selftext
        };
        return logger(message);
      } else return Promise.resolve({});
    }).catch((err) => {
      console.error(err);
      return Promise.resolve();
    });
}

module.exports = function handler (event, context, callback) {
  console.log('Bot received ping event.');

  return Promise.all(subreddits.map(s => r.getSubreddit(s).getHot()
    .then((posts) => {
      return Promise.all(posts.map(logic));
    })))
    .then(() => callback());
};
