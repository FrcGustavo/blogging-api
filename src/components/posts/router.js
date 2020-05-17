const express = require('express');
const model = require('../../models/posts');
const service = require('./service')(model);
const controller = require('./controller')(service);

const POSTS = (app) => {
  const router = express.Router();
  app.use('/api/posts', router);

  router.get('/', controller.index);
  router.post('/', controller.create);
  router.get('/:slug', controller.show);
  router.patch('/:slug', controller.update);
  router.delete('/:slug', controller.destroy);
};

module.exports = POSTS;
