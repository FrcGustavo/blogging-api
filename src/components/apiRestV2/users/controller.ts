import { Request, Response, NextFunction } from 'express';
import success from '../../../router/success';
import {
  UsersControllerContract,
  UsersServiceContract,
  // QueryPostsList,
} from './types';

export class UsersController implements UsersControllerContract {
  constructor(private service: UsersServiceContract) {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const createdUser = await this.service.createUser(body);
      success({ res, data: createdUser });
    } catch (error) {
      next(error);
    }
  }
}

// export class PostsController implements PostsControllerContract {
//   constructor(private service: PostsServiceContract) {
//     this.getAllPosts = this.getAllPosts.bind(this);
//     this.createPost = this.createPost.bind(this);
//     this.getOnePost = this.getOnePost.bind(this);
//     this.updatePost = this.updatePost.bind(this);
//     this.deletePost = this.deletePost.bind(this);
//   }

//   async getAllPosts(
//     req: Request<{}, {}, {}, QueryPostsList>,
//     res: Response,
//     next: NextFunction
//   ) {
//     const { query } = req;
//     try {
//       const listPosts = await this.service.getAllPosts(query);
//       success({ res, data: listPosts });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async createPost(req: Request, res: Response, next: NextFunction) {
//     const { body } = req;
//     try {
//       const createdPost = await this.service.createPost(body);
//       success({ res, data: createdPost });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async getOnePost(req: Request, res: Response, next: NextFunction) {
//     const { uuid } = req.params;
//     try {
//       const retrievedPost = await this.service.getOnePost(uuid);
//       success({ res, status: 201, data: retrievedPost });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async updatePost(req: Request, res: Response, next: NextFunction) {
//     const { uuid } = req.params;
//     try {
//       const updatedPost = await this.service.updatePost(uuid);
//       success({ res, data: updatedPost });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async deletePost(req: Request, res: Response, next: NextFunction) {
//     const { uuid } = req.params;
//     try {
//       const deletedPost = await this.service.deletePost(uuid);
//       success({ res, data: deletedPost });
//     } catch (error) {
//       next(error);
//     }
//   }
// }
