const validParams = require('../../utils/params/validParams');
const requireParams = require('../../utils/params/requireParams');
const NotFound = require('../../utils/errors/NotFound');

function service(model) {
  const requireFields = [
    'title', 'description', 'cover', 'post', 'keywords',
  ];
  const validFields = [
    ...requireFields,
    'slug',
    'views',
    'timeShared',
    'likes',
  ];

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

  /**
   * Insert a new post in the database
   * @param {*} post
   */
  const insert = async (post) => {
    const validedPost = validParams(validFields, post);
    const requiredPost = requireParams(requireFields, validedPost);

    const isPublic = false;
    const views = 0;
    const timeShared = 0;
    const likes = 0;

    let { slug } = requiredPost;

    if (!slug) {
      slug = String(Math.random());
    }

    const createdPost = await model.create({
      ...requiredPost,
      slug,
      isPublic,
      views,
      timeShared,
      likes,
    });

    return createdPost;
  };

  const update = async (slug, post) => {
    const validedPost = validParams(validFields, post);
    const updatedPost = await model.updateOne({ slug }, validedPost);

    if (updatedPost.nModified !== 1) {
      throw new Error('error to update post');
    }

    return updatedPost;
  };

  const destroy = async (slug) => {
    if (!slug) throw new Error('field slug is required');

    const deletedPost = await model.updateOne({ slug }, { isActive: false });

    if (deletedPost.nModified !== 1) {
      throw new Error('error to delete post');
    }

    return deletedPost;
  };

  return {
    findAll,
    findBySlug,
    insert,
    update,
    destroy,
  };
}


module.exports = service;
