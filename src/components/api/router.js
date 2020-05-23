const express = require('express');
const isValidSessionUser = require('../../utils/middlewares/isValidSessionUser');
const isLogged = require('../../utils/middlewares/isLogged');

const controller = require('./controller');

const API = (app) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/', isValidSessionUser('/signin'), controller.index);
  router.get('/signup', isLogged, controller.signup);
  router.post('/signup', isLogged, controller.register);
  router.get('/signin', isLogged, controller.signin);
  router.post('/signin', isLogged, controller.login);
};

module.exports = API;
