import Router, { Application } from 'express';
import requireParams from '../../utils/params/requireParams';
import validParams from '../../utils/params/validParams';
import User from '../../models/user';
import UsersService from '../users/service';
import UsersController from '../users/controller';
import AuthRouter from './router';

function AUTH(app: Application): void {
  const service = new UsersService(User, { requireParams, validParams });
  const controller = new UsersController(service);
  const router = new AuthRouter(app, Router(), '/api/auth', controller);
  router.setupRouter();
  router.loadRoutes();
}

export default AUTH;
