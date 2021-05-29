import { Router } from 'express';
import { PostsRouterContract, PostsControllerContract } from './types';

export class PostsRouter implements PostsRouterContract {
  constructor(
    private router: Router,
    private controller: PostsControllerContract
  ) {}
}
