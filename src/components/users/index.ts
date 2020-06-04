import { Router } from 'express';
import requireParams from '../../utils/params/requireParams';
import validParams from '../../utils/params/validParams';
import User from '../../models/user';
import UsersService from './service';
import UsersController from './controller';
import UsersRouter from './router';

function USERS(app: any): any {
  const service = new UsersService(User, { requireParams, validParams });
  const controller = new UsersController(service);
  const router = new UsersRouter(app, Router(), '/api/users', controller);
  router.setupRouter();
  router.loadRoutes();
};

export default USERS;