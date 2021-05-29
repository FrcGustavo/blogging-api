import { Request, Response, NextFunction } from 'express';
import { UsersService } from './service';
import { success } from '../../../router/success';

export class UsersController {
  constructor(private usersService: UsersService) {
    this.findOnePost = this.findOnePost.bind(this);
    this.findAllPosts = this.findAllPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  async findOnePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { lang } = req.query;
    try {
      const post = await this.usersService.findOnePost(id, lang);
      success(res, 'post retrieved', post, 200);
    } catch (error) {
      next(error);
    }
  }

  async findAllPosts(req: Request, res: Response, next: NextFunction) {
    const { query } = req;
    try {
      const posts = await this.usersService.findAll(query);
      success(res, 'posts listed', posts, 200)
    } catch (error) {
      next(error);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    const { body: post, user } = req;
    try {
      const createdPost = await this.usersService.insert(post, user);
      success(res, 'post created', createdPost, 200);
    } catch (error) {
      next(error);
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<void> {
		const post = req.body;
		const { id } = req.params;
		const { id: authorId } = (req.user as any);
		try {
			const updatedPost = await this.usersService.update(id, post, authorId);
			success(res, 'post updated', updatedPost, 200);
		} catch (error) {
			next(error);
		}
  };
  
  async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const { id: authorId } = (req.user as any);
		try {
			const deletedPost = await this.usersService.destroy(id, authorId);
			success(res, 'post deleted', deletedPost, 200);
		} catch (error) {
			next(error);
		}
	};
}