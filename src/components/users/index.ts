import { Router } from 'express';
import UsersRouter from './router';

function USERS(app: any): any {
  const router = new UsersRouter(app, Router(), '/api/users', {});
  router.setupRouter();
  router.loadRoutes();
};

export default USERS;