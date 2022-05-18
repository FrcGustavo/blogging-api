import { Router } from 'express';
import { UsersRouterContract, UsersControllerContract } from './types';

export class UsersRouter implements UsersRouterContract {
  constructor(
    private router: Router,
    private controller: UsersControllerContract
  ) {
    this.router
      .route('/users')
      // .get(this.controller.getAllPosts)
      .get(this.controller.createUser);
    // this.router
    //   .route('/posts/:uid')
    //   .get(this.controller.getOnePost)
    //   .put(this.controller.updatePost)
    //   .delete(this.controller.deletePost);
  }
}
