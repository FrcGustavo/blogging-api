import {
  PostsServiceContract,
  PostEntityContract,
  QueryPostsList,
  PostItem,
} from './types';

export class PostsService implements PostsServiceContract {
  constructor(private entity: PostEntityContract) {}

  async getAllPosts(query: QueryPostsList) {
    const limit = Number(query.limit ? query.limit : 24);
    const page = Number(query.page ? query.page : 1);
    const offset = (page - 1) * limit;

    const options = {
      limit,
      offset,
    };

    const listPosts = await this.entity.findAll(options);

    return listPosts;
  }

  async getOnePost(uuid: string) {
    const post = await this.entity.findOne(uuid);
    return post;
  }

  async createPost(post: PostItem) {
    const createdPost = await this.entity.create(post);
    return createdPost;
  }

  async updatePost(uuid: string) {
    const isUpdated = await this.entity.update(uuid);
    return { isUpdated };
  }

  async deletePost(uuid: string) {
    const isDeleted = await this.entity.delete(uuid);
    return { isDeleted };
  }
}
