const express = require('express');

const POSTS = (app) => {
  const router = express.Router();
  app.use('/', router);
};

module.exports = POSTS;
