const express = require('express');

const controller = require('./controller');

const API = (app) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/', controller.index);
};

module.exports = API;
