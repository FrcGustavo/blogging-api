const {
  mongoMock,
  findStub,
  countDocumentsStub,
  createStub,
  updateOneStub,
} = require('../utils/mocks/mongoMock');
const { PostsMock } = require('../utils/mocks/postsMock');
const service = require('../components/posts/service')(mongoMock);

describe('service - posts', () => {
  describe('when findAll method is called', () => {
    test('should call the find, countDocuments MongoMock Method', async () => {
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

  describe('when insert method is called', () => {
    test('should call the create MongoMock Method', async () => {
      await service.insert(PostsMock[0]);
      expect(createStub.called).toBeTruthy();
    });

    test('should return a new posts', async () => {
      const result = await service.insert(PostsMock[0]);
      const fakeResult = PostsMock[0];
      expect(result).toEqual(fakeResult);
    });
  });

  describe('when update method is called', () => {
    test('should call the updateOne MongoMock Method', async () => {
      await service.update(PostsMock[0].slug, { title: 'this is a new title' });
      expect(updateOneStub.called).toBeTruthy();
    });

    test('should return a posts updated', async () => {
      const result = await service.update(PostsMock[0].slug, { title: 'this is a new title' });
      const fakeResult = { nModified: 1 };
      expect(result).toEqual(fakeResult);
    });

    test('should generate a error to update post', () => {
      service.update('error', { title: 'this is a new title' })
        .catch((err) => {
          const msg = err.message;
          expect(msg).toEqual('error to update post');
        });
    });
  });

  describe('when destroy method is called', () => {
    test('should call the updateOne MongoMock Method', async () => {
      await service.destroy(PostsMock[0].slug);
      expect(updateOneStub.called).toBeTruthy();
    });

    test('should return a posts deleted', async () => {
      const result = await service.destroy(PostsMock[0].slug);
      const fakeResult = { nModified: 1 };
      expect(result).toEqual(fakeResult);
    });

    test('should generate a error to delete post', () => {
      service.destroy('error')
        .catch((err) => {
          const msg = err.message;
          expect(msg).toEqual('error to delete post');
        });
    });

    test('should generate a error field slug is required', () => {
      service.destroy()
        .catch((err) => {
          const msg = err.message;
          expect(msg).toEqual('field slug is required');
        });
    });
  });
});
