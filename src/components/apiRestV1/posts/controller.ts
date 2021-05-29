import { Request, Response, NextFunction, query } from 'express';
import { PostsService } from './service';
import { success } from '../../../router/success';

export class PostsController {
  constructor(private service: PostsService) {
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { query } = req;
    try {
      const listedPosts = await this.service.findAll(query);
      success(res, 'listed posts', listedPosts, 200);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { slug } = req.params;
    const { lang } = req.query;
    try {
      const post = await this.service.findBySlug(slug, lang as string);
      success(res, 'retrieved post', post, 200);
    } catch (error) {
      next(error);
    }
  }
}
