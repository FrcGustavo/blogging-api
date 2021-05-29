import { Router } from 'express';
import { PostsService } from './service';
import { PostsController } from './controller';
import { PostsRouter } from './router';

export const Posts = (router: Router) => {
  const service: PostsService = new PostsService();
  const controller: PostsController = new PostsController(service);
  new PostsRouter(router, controller);
};
