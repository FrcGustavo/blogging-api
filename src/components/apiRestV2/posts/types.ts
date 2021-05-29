import { Request, Response, NextFunction } from 'express';

export type PostRetrieved = {
  uid: string;
  title: string;
  description: string;
  keywords: string;
  cover: string;
  body: string;
  slug: string;
};

export type PostItem = {
  uid: string;
  title: string;
  isPublic: boolean;
};

export type PostsList = Array<PostItem>;

export type QueryPostsList = {
  page?: string;
  limit?: string;
};

export interface PostsRouterContract {}

export interface PostsControllerContract {
  getAllPosts: (
    req: Request<{}, {}, {}, QueryPostsList>,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getOnePost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

export interface PostsServiceContract {
  getAllPosts: (query: QueryPostsList) => Promise<PostsList>;
  getOnePost: () => Promise<PostRetrieved>;
}

export type OptionsFindAllPostEntity = {
  limit: number;
  offset: number;
};

export interface PostEntityContract {
  findAll: (options: OptionsFindAllPostEntity) => Promise<PostsList>;
  findOne: () => Promise<void>;
}
