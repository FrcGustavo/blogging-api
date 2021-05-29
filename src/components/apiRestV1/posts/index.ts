import { Router } from 'express';
import { Post } from '../../../models/posts';
import { PostsService } from './service';
import { PostsController } from './controller';
import { PostsRouter } from './router';

export const Posts = (router: Router) => {
  const service: PostsService = new PostsService(Post);
  const controller: PostsController = new PostsController(service);
  new PostsRouter(router, controller);
};
