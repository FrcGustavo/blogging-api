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
      res.json(posts);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Response a posts
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  const show = async (req, res, next) => {
    const { slug } = req.params;
    try {
      const post = await service.findBySlug(slug);
      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  return {
    index,
    show,
  };
}

module.exports = controller;
