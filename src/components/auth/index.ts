import Router, { Application } from 'express';
import UsersService from '../users/service';
import UsersController from '../users/controller';
import AuthRouter from './router';

function AUTH(app: Application): void {
  const service = new UsersService({});
  const controller = new UsersController(service);
  const router = new AuthRouter(app, Router(), '/api/auth', controller);
  router.setupRouter();
  router.loadRoutes();
};

export default AUTH;