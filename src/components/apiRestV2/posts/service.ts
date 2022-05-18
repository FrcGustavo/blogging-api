import {
  PostsServiceContract,
  PostEntityContract,
  QueryPostsList,
  UpdatePostItem,
  CreatePostItem,
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

  async createPost({ title, isPublic }: Partial<CreatePostItem>) {
    const post: CreatePostItem = {
      title: '',
      isPublic: false,
    };

    if (!(isPublic === undefined)) {
      post.isPublic = isPublic;
    }

    if (!title) {
      throw new Error('the title is requred');
    }

    post.title = title;

    const createdPost = await this.entity.create(post);
    return createdPost;
  }

  async updatePost(uuid: string, { title, isPublic }: UpdatePostItem) {
    const post = { title, isPublic };
    if (typeof title === 'undefined') {
      delete post.title;
    }

    if (typeof isPublic === 'undefined') {
      delete post.isPublic;
    }

    const isUpdated = await this.entity.update(uuid, post);
    return { isUpdated };
  }

  async deletePost(uuid: string) {
    const isDeleted = await this.entity.delete(uuid);
    return { isDeleted };
  }
}
