import { Request, Response, NextFunction } from 'express';
import success from '../../../router/success';
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
      success({ res, data: listPosts });
    } catch (error) {
      next(error);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      success({ res });
    } catch (error) {
      next(error);
    }
  }

  async getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
      const retrievedPost = await this.service.getOnePost();
      success({ res, data: retrievedPost });
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      success({ res });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      success({ res });
    } catch (error) {
      next(error);
    }
  }
}
