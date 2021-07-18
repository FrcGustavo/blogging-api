import {
  PostsServiceContract,
  PostEntityContract,
  QueryPostsList,
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

  async getOnePost() {
    return {
      uid: '',
      title: '',
      isPublic: false,
    };
  }
}
