const NotFound = require('../../utils/errors/NotFound');

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
      throw new NotFound('list of posts not found', 404);
    }

    const totalPosts = await model.countDocuments(filters);
    const totalPages = Math.ceil(totalPosts / (limit));
    const page = query.page || 1;
    const pagination = { totalPosts, totalPages, page };

    return { posts, pagination };
  };

  /**
   * find one post with next filters
   * isPublic: true
   * isActive: true
   * @param {String} slug
   */
  const findBySlug = async (slug) => {
    const filters = { slug, isPublic: true, isActive: true };
    const post = await model.findOne(filters);
    if (!post) {
      throw new NotFound(`the resource ${slug} not found`);
    }
    return post;
  };

  return {
    findAll,
    findBySlug,
  };
}


module.exports = service;
