import { Router } from 'express';
import { PostEntity } from './entity';
import { PostsService } from './service';
import { PostsController } from './controller';
import { PostsRouter } from './router';

export const Posts = (router: Router) => {
  const entity = new PostEntity();
  const service: PostsService = new PostsService(entity);
  const controller: PostsController = new PostsController(service);
  new PostsRouter(router, controller);
};
