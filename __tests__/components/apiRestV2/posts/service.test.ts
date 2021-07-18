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

  async findOne() {
    return {
      uid: '',
      title: '',
      isPublic: false,
    }
  }
}

describe('service - posts', () => {
  const mockPostEntity = new MockPostService();
  const service = new PostsService(mockPostEntity);
  describe('getAllPosts', () => {
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

  describe('getOnePost', () => {
    test('should return a post', async () => {
      const result = await service.getOnePost()
      const expected = {
        uid: '',
        title: '',
        isPublic: false,
      };
      expect(result).toEqual(expected);
    });
  });
});
