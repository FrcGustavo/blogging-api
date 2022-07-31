import { Router } from 'express';
import { Polls } from './polls';

const setupRouter = (router: Router) => {
  Polls(router);

  return router;
};

const POLLS_APP = (app: any) => {
  const router: Router = Router();
  app.use('/polls-app/', setupRouter(router));
};

export default POLLS_APP;
