import { PostsService } from '../../../../src/components/apiRestV2/posts/service';
import { PostEntityContract } from '../../../../src/components/apiRestV2/posts/types';

class MockPostService implements PostEntityContract {
  async findAll() {
    return [
      {
        uid: '',
        title: '',
        isPublic: false,
      },
    ];
  }

  async findOne() {}
}

describe('service - posts', () => {
  const mockPostEntity = new MockPostService();
  const service = new PostsService(mockPostEntity);
  describe('findAll', () => {
    test('should return a list of posts', async () => {
      const result = await service.getAllPosts({});
      const expected = [
        {
          uid: '',
          title: '',
          isPublic: false,
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
