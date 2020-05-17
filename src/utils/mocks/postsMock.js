/* eslint-disable no-throw-literal */
const PostsMock = [{

}];

const findAll = async (query) => {
  const { limit, sort, page } = query;
  if (!limit || !sort || !page) throw false;
  return {
    post: [],
    pagination: {},
  };
};


module.exports = {
  PostsMock,
  serviceMock: {
    findAll,
  },
};
