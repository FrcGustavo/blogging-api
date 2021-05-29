import { Router } from 'express';
import { Posts } from './posts';

const setupRouter = (router: Router) => {
  Posts(router);
  return router;
};

const API_REST_V2 = (app: any) => {
  const router: Router = Router();
  app.use('/rest/v2', setupRouter(router));
};

export default API_REST_V2;
