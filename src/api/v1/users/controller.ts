import { Request, Response, NextFunction } from 'express';
import { UsersService } from './service';

export class UsersController {
  constructor(private usersService: UsersService) {
    this.findAllPosts = this.findAllPosts.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  async findAllPosts(req: Request, res: Response, next: NextFunction) {
    const { query } = req;
    try {
      const posts = await this.usersService.findAll(query);
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    const { body: post, user } = req;
    console.log(post);
    
    try {
      const createdPost = await this.usersService.insert(post, user);
      return res.json(createdPost);
    } catch (error) {
      next(error);
    }
  }
}