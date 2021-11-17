import { PostsService } from '../../../../src/components/apiRestV2/posts/service';
import {
  PostEntityContract,
  OptionsFindAllPostEntity,
  CreatePostItem,
  UpdatePostItem,
} from '../../../../src/components/apiRestV2/posts/types';

class MockPostService implements PostEntityContract {
  async findAll(options: OptionsFindAllPostEntity) {
    if (options) {
      return [
        {
          uuid: '',
          title: '',
          isPublic: false,
        },
      ];
    }

    return [
      {
        uuid: '',
        title: '',
        isPublic: false,
      },
    ];
  }

  async findOne() {
    return {
      uuid: '',
      title: '',
      isPublic: false,
    };
  }

  async create(post: CreatePostItem) {
    if (post) {
      return 'post';
    }

    return '';
  }

  async update(uuid: string, post: UpdatePostItem) {
    if (uuid && post) {
      return true;
    }

    return false;
  }

  async delete(uuid: string) {
    if (uuid === 'p') {
      return true;
    }

    return false;
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
      const result = await service.getOnePost('p');
      const expected = {
        uid: '',
        title: '',
        isPublic: false,
      };
      expect(result).toEqual(expected);
    });
  });
});
