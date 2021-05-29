import { Router } from 'express';
import passport from 'passport';
import { PostsController } from './controller';

export class PostsRouter {
  constructor(private router: Router, private controller: PostsController) {
    this.router.route('/posts').get(this.controller.findAll);

    this.router.route('/posts/:slug').get(this.controller.findOne);
  }
}
