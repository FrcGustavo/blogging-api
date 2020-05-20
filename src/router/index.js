const API = require('../components/api/router');
const POSTS = require('../components/posts/router');

const ROUTER = (app) => {
  API(app);
  POSTS(app);
};

module.exports = ROUTER;
