import express, { Application } from 'express';
import isValidSessionUser from '../../utils/middlewares/isValidSessionUser';
import isLogged from '../../utils/middlewares/isLogged';

import * as controller from './controller';

const API = (app: Application) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/', isValidSessionUser('/signin'), controller.index);
  router.get('/signup', isLogged, controller.signup);
  router.post('/signup', isLogged, controller.register);
  router.get('/signin', isLogged, controller.signin);
  router.post('/signin', isLogged, controller.login);
};

export default API;
