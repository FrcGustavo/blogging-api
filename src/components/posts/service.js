function service(model) {
  /**
   * find posts with next filters
   * isPublic: true
   * isActive: true
   * limit: {
   *  default: 10
   * }
   * sort: {
   *  default: -_id
   * }
   * skip: {
   *  alias: page,
   *  default: page * limit
   * }
   * @param {*} query
   */
  const findAll = async (query) => {
    let { limit, sort, page: skip } = query;
    limit = Number(limit) || 10;
    sort = sort ? String(sort) : '-_id';
    skip = (Number(skip || 1) - 1) * limit;

    const filters = { isPublic: true, isActive: true };
    const posts = await model.find(filters).limit(limit).sort(sort).skip(skip);

    if (posts.length === 0) {
      throw new Error('list of posts not found', 404);
    }

    const totalPosts = await model.countDocuments(filters);
    const totalPages = Math.ceil(totalPosts / (limit));
    const page = query.page || 1;
    const pagination = { totalPosts, totalPages, page };

    return { posts, pagination };
  };

  return {
    findAll,
  };
}


module.exports = service;
