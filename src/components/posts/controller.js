const success = require('../../router/success');

function controller(service) {
  /**
   * Response a list of posts
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const index = async (req, res, next) => {
    const { limit, sort, page } = req.params;
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
  const show = async (req, res, next) => {
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
  const create = async (req, res, next) => {
    const post = req.body;
    try {
      const createdPost = await service.insert(post);
      success(res, 'post created', createdPost, 201);
    } catch (error) {
      next(error);
    }
  };

  return {
    index,
    show,
    create,
  };
}

module.exports = controller;
