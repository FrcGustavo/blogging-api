import express from 'express';
import model from '../../models/posts';
import service from './service';
import postController from './controller';

const postcontroller = postController(service(model));

const POSTS = (app: any, controller: any = postcontroller) => {
  const router = express.Router();
  app.use('/api/posts', router);

  router.get('/', controller.index);
  router.post('/', controller.create);
  router.get('/:slug', controller.show);
  router.patch('/:slug', controller.update);
  router.delete('/:slug', controller.destroy);
};

export default POSTS;
