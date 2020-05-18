const {
  mongoMock,
  findStub,
  countDocumentsStub,
} = require('../utils/mocks/mongoMock');
const { PostsMock } = require('../utils/mocks/postsMock');
const service = require('../components/posts/service')(mongoMock);

describe('service - posts', () => {
  test('when findAll method is called', async () => {
    await service.findAll({});
    expect(findStub.called).toBeTruthy();
    expect(countDocumentsStub.called).toBeTruthy();
  });

  test('should return a list of posts', async () => {
    const result = await service.findAll({});
    const fakeResult = {
      posts: PostsMock,
      pagination: {
        page: 1,
        totalPages: 1,
        totalPosts: PostsMock.length,
      },
    };
    expect(result).toEqual(fakeResult);
  });

  test('should generate a error', () => {
    service.findAll({ limit: 20, sort: 'title', page: 2 })
      .catch((err) => {
        const msg = err.message;
        expect(msg).toEqual('list of posts not found');
      });
  });
});
