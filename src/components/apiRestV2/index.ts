import { Router } from 'express';
import { Posts } from './posts';
import { Users } from './users';

const setupRouter = (router: Router) => {
  Posts(router);
  Users(router);
  return router;
};

const API_REST_V2 = (app: any) => {
  const router: Router = Router();
  app.use('/', setupRouter(router));
};

export default API_REST_V2;
