import { Request, Response, NextFunction } from 'express';

const PostsController = (service: any, success: any) => {
  /**
   * Response a list of posts
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
   */
  const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const post = req.body;
    const { slug } = req.params;
    const { id: authorId } = (req.user as any);
    try {
      const updatedPost = await service.update(slug, post, authorId);
      success(res, 'post updated', updatedPost, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response with a deleted posts
   */
  const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    const { id: authorId } = (req.user as any);
    try {
      const deletedPost = await service.destroy(slug, authorId);
      success(res, 'post deleted', deletedPost, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response a list of posts filtered by author
   */
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

export default PostsController;
