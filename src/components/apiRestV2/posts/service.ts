import { PostsServiceContract } from './types';

export class PostsService implements PostsServiceContract {
  async getAllPosts() {
    return [
      {
        uid: '',
        title: '',
        isPublic: false,
      },
    ];
  }

  async getOnePost() {
    return {
      uid: '',
      title: '',
      description: '',
      keywords: '',
      cover: '',
      body: '',
      slug: '',
    };
  }
}
