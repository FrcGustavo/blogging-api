import { Request, Response, NextFunction } from 'express';
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
      success(res, '', listedPosts, 200);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      success(res, '', {}, 200);
      
    } catch (error) {
      next(error);
    }
  }

}
