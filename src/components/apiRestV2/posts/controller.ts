import { Request, Response, NextFunction } from 'express';
import {
  PostsControllerContract,
  PostsServiceContract,
  QueryPostsList,
} from './types';

export class PostsController implements PostsControllerContract {
  constructor(private service: PostsServiceContract) {
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getOnePost = this.getOnePost.bind(this);
  }

  async getAllPosts(
    req: Request<{}, {}, {}, QueryPostsList>,
    res: Response,
    next: NextFunction
  ) {
    const { query } = req;
    try {
      const listPosts = await this.service.getAllPosts(query);
      res.json(listPosts);
    } catch (error) {
      next(error);
    }
  }

  async getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
      const retrievedPost = await this.service.getOnePost();
      res.json(retrievedPost);
    } catch (error) {
      next(error);
    }
  }
}
