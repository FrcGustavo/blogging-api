/* eslint-disable no-throw-literal */
const PostsMock = [{
  title: '',
  body: '',
  cover: '',
  description: '',
  keywords: '',
  slug: 'this-my-posts',
  isPublic: true,
  views: 0,
  timeShared: 0,
  likes: 0,
  isActive: true,
}];

const findAll = async (query) => {
  const { limit, sort, page } = query;
  if (!limit || !sort || !page) throw false;
  return {
    post: PostsMock,
    pagination: {
      totalPosts: PostsMock.length,
      totalPages: 1,
      page: 1,
    },
  };
};

const findBySlug = async (slug) => {
  if (slug === 'error') throw false;
  return Promise.resolve(PostsMock[0]);
};


module.exports = {
  PostsMock,
  serviceMock: {
    findAll,
    findBySlug,
  },
};
