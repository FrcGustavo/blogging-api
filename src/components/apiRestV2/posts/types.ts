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

export interface PostsRouterContract {}

export interface PostsControllerContract {
  getAllPosts: (
    req: Request,
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
  getAllPosts: () => Promise<PostsList>;
  getOnePost: () => Promise<PostRetrieved>;
}
