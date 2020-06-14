import { Request, Response, NextFunction } from 'express';
import success from'../../router/success';

function controller(service: any) {
  /**
   * Response a list of posts
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { limit, sort, page } = req.query;
    try {
      const posts = await service.findAll({ limit, sort, page });
      success(res, 'posts listed', posts, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response with only a post
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    try {
      const post = await service.findBySlug(slug);
      success(res, 'post retrieved', post, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response with a new posts
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body: post, user } = req;
    try {
      const createdPost = await service.insert(post, user);
      success(res, 'post created', createdPost, 201);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response with a updated posts
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const post = req.body;
    const { slug } = req.params;
    try {
      const updatedPost = await service.update(slug, post);
      success(res, 'post updated', updatedPost, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response with a deleted posts
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    try {
      const deletedPost = await service.destroy(slug);
      success(res, 'post deleted', deletedPost, 200);
    } catch (error) {
      next(error);
    }
  };

  const findByAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorId = (req.user as any).id;
    const { query }  = req;
    try {
      const posts = await service.findByAuthor(authorId, query);
      success(res, 'posts listed', posts, 200);
    } catch (error) {
      next(error);
    }
  };

  return {
    index,
    show,
    create,
    update,
    destroy,
    findByAuthor,
  };
}

export default controller;
