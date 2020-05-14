const express = require('express');

const controller = require('./controller');

const API = (app) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/', controller.index);
  router.get('/signup', controller.signup);
  router.post('/signup', controller.register);
  router.get('/signin', controller.signin);
  router.post('/signin', controller.login);
};

module.exports = API;
