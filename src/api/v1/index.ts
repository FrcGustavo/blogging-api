import { Router } from 'express';
import { Users } from './users';
import { Posts } from './posts';

const setupRouter = (router: Router) => {
  Users(router);
  Posts(router);
  return router;
}

const API_V1 = (app: any) => {
  const router: Router = Router(); 
  app.use('/v1', setupRouter(router));
};

export default API_V1;