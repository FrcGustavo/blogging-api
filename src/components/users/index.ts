import { Router } from 'express';
import UsersService from './service';
import UsersController from './controller';
import UsersRouter from './router';

function USERS(app: any): any {
  const service = new UsersService({});
  const controller = new UsersController(service);
  const router = new UsersRouter(app, Router(), '/api/users', controller);
  router.setupRouter();
  router.loadRoutes();
};

export default USERS;