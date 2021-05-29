import { PostsControllerContract, PostsServiceContract } from './types';

export class PostsController implements PostsControllerContract {
  constructor(private service: PostsServiceContract) {}
}
