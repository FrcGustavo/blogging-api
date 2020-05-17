const express = require('express');
const model = require('./model');
const service = require('./service')(model);
const controller = require('./controller')(service);

const POSTS = (app) => {
  const router = express.Router();
  app.use('/api/posts', router);

  router.get('/', controller.index);
};

module.exports = POSTS;
