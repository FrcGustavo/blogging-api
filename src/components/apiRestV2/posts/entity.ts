import { PostEntityContract, PostItem } from './types';

const POST = {
  uid: '',
  title: '',
  isPublic: false,
};

const POSTS = new Array(24).fill(POST);

export class PostEntity implements PostEntityContract {
  async findAll() {
    return POSTS;
  }

  async findOne() {
    return POSTS[0];
  }

  async create(post: PostItem) {
    POSTS.push(post);
    return POSTS[POSTS.length - 1];
  }

  async update() {
    return true;
  }

  async delete() {
    return false;
  }
}
