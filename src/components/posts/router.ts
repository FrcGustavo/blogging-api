import express from 'express';
import passport from 'passport';
import model from '../../models/posts';
import service from './service';
import postController from './controller';

import '../../utils/auth/strategies/jwt';

const postcontroller = postController(service(model));

const POSTS = (app: any, controller: any = postcontroller) => {
  const router = express.Router();
  app.use('/api/posts', router);

  router.get(
    '/author',
    passport.authenticate('jwt', { session: false }),
    controller.findByAuthor,
  );
  router.get('/', controller.index);
  router.post('/', 
    passport.authenticate('jwt', { session: false }),  
    controller.create,
  );
  router.get('/:slug', controller.show);
  router.patch('/:slug', controller.update);
  router.delete('/:slug', controller.destroy);
};

export default POSTS;
