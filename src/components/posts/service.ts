import showdown from 'showdown';
import NotFound from '../../utils/errors/NotFound';
import slugify from '../../utils/plugins/slugify';

function PostsService(model: any, validParams: any, requireParams: any, setupPagination: any, toDoPagination: any) {
  const converter = new showdown.Converter();
  const requireFields = [
    'title', 'cover', 'body', 'description', 'keywords',
  ];
  const validFields = [
    ...requireFields,
    'slug', 'isPublic',
  ];

  const find = async (filters: any, limit: any, sort: any, skip: any) => (
    await model.find(filters)
    .limit(limit)
    .sort(sort)
    .skip(skip)
  );


  const findByAuthor = async (authorId: string, query: any) => {
    const {
      limit,
      skip,
      sort,
      page,
    } = setupPagination(query);

    const filters = { user: authorId, isDisabled: false };
    const posts = await find(filters, limit, sort, skip);
    const pagination = await toDoPagination(model, { limit, page }, filters);

    const emptyPosts = posts.map(({
      _id,
      title,
      cover,
      body,
      description,
      slug,
      keywords,
      views,
      timeShared,
      likes,
      isPublic,
    }: any) => ({
      id: _id,
      title,
      cover,
      body,
      description,
      slug,
      keywords,
      views,
      timeShared,
      likes,
      isPublic,
    }));

    return { posts: emptyPosts, pagination };
  };

  const buildSlug = async (slug: any): Promise<void> => {
    const existSlug = await model.countDocuments({ slug });
    if (existSlug > 0) {
      return buildSlug(`${slug}-${existSlug}`);
    }
    return slug;
  };

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
  const findAll = async (query: any): Promise<any> => {
    const {
      limit,
      skip,
      sort,
      page,
    } = setupPagination(query);

    const filters = { isPublic: true, isDisabled: false };
    const posts = await find(filters, limit, sort, skip);
    const pagination = await toDoPagination(model, { limit, page }, filters);

    const emptyPosts = posts.map(({
      _id,
      title,
      cover,
      description,
      slug,
    }: any) => ({
      id: _id,
      title,
      cover,
      description,
      slug,
    }));

    return { posts: emptyPosts, pagination };
  };

  /**
   * find one post with next filters
   * isPublic: true
   * isActive: true
   * @param {String} slug
   */
  const findBySlug = async (slug: string): Promise<any> => {
    const filters = { slug, isPublic: true, isDisabled: false };
    const post = await model.findOne(filters);

    if (!post) {
      throw new NotFound(`the resource ${slug} not found`);
    }
    const body = converter.makeHtml(post.body)
    const {
      _id: id,
      user,
      userCover,
      username,
      title,
      cover,
      description,
      keywords,
      views,
      timeShared,
      likes,
      createdAt,
    } = post;
    return {
      id,
      user,
      userCover,
      username,
      title,
      cover,
      body,
      description,
      keywords,
      views,
      timeShared,
      likes,
      createdAt,
    };
  };

  /**
   * Insert a new post in the database
   */
  const insert = async (post: any, author: any): Promise<void> => {
    const validedPost = validParams(validFields, post);
    const requiredPost = requireParams(requireFields, validedPost);

    const {
      id: user,
      cover: userCover,
      username,
    } = author;

    const { title } = requiredPost;
    let { slug } = requiredPost;

    if (!slug) {
      slug = await buildSlug(slugify(title));
    }

    const createdPost = await model.create({
      user,
      userCover,
      username,
      ...requiredPost,
      slug,
    });

    return createdPost;
  };

  const update = async (slug: string, post: any, authorId: string): Promise<boolean> => {
    const validedPost = validParams(validFields, post);
    const updatedPost = await model.updateOne({ slug, isDisabled: false, user: authorId }, validedPost);

    if (updatedPost.nModified !== 1) {
      throw new Error('error to update post');
    }

    return false;
  };

  const destroy = async (slug: string, authorId: string): Promise<boolean> => {
    if (slug === '') { throw new Error('field slug is required'); }

    const deletedPost = await model.updateOne({ slug, isDisabled: false, user: authorId, }, { isDisabled: true });

    if (deletedPost.nModified !== 1) {
      throw new Error('error to delete post');
    }

    return false;
  };

  return {
    findByAuthor,
    findAll,
    findBySlug,
    insert,
    update,
    destroy,
  };
}

export default PostsService;
