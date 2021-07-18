import { Request, Response, NextFunction } from 'express';

export type UserItem = {
  uid: string;
  name: string;
  username: string;
  password?: string;
};

export type UsersList = Array<UserItem>;

// export type QueryPostsList = {
//   page?: string;
//   limit?: string;
// };

export interface UsersRouterContract {}

export interface UsersControllerContract {
  //   getAllPosts: (
  //     req: Request<{}, {}, {}, QueryPostsList>,
  //     res: Response,
  //     next: NextFunction
  //   ) => Promise<void>;
  createUser: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  //   getOnePost: (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) => Promise<void>;
  //   updatePost: (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) => Promise<void>;
  //   deletePost: (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) => Promise<void>;
}

export interface UsersServiceContract {
  //   getAllPosts: (query: QueryPostsList) => Promise<PostsList>;
  //   getOnePost: (uuid: string) => Promise<PostItem>;
  createUser: (user: UserItem) => Promise<UserItem>;
  //   updatePost: (uuid: string) => Promise<{ isUpdated: boolean }>;
  //   deletePost: (uuid: string) => Promise<{ isDeleted: boolean }>;
}

// export type OptionsFindAllPostEntity = {
//   limit: number;
//   offset: number;
// };

export interface UserEntityContract {
  findAll: () => Promise<UsersList>;
  // findOne: (uuid: string) => Promise<UserItem>;
  create: (user: UserItem) => Promise<UserItem>;
  // update: (uuid: string) => Promise<boolean>;
  // delete: (uuid: string) => Promise<boolean>;
}
