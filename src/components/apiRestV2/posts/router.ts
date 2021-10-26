import { Router } from 'express';
import { PostsRouterContract, PostsControllerContract } from './types';

export class PostsRouter implements PostsRouterContract {
  constructor(
    private router: Router,
    private controller: PostsControllerContract
  ) {
    this.router
      .route('/posts')
      .get(this.controller.getAllPosts)
      .post(this.controller.createPost);
    this.router
      .route('/posts/:uuid')
      .get(this.controller.getOnePost)
      .put(this.controller.updatePost)
      .delete(this.controller.deletePost);
  }
}
