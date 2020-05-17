function controller(service) {
  const index = async (req, res, next) => {
    const { limit, sort, page } = req.params;
    try {
      const posts = await service.findAll({ limit, sort, page });
      res.json(posts);
    } catch (error) {
      next(error);
    }
  };

  return {
    index,
  };
}

module.exports = controller;
