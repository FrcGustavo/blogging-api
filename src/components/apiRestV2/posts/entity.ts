import { PostEntityContract, PostItem } from './types';
import { setupDatabaseBlog } from '../../../databases';

const POST = {
  uid: '',
  title: '',
  isPublic: false,
};

const POSTS = new Array(24).fill(POST);

export class PostEntity implements PostEntityContract {
  async findAll() {
    const { Post } = await setupDatabaseBlog();
    const ListPosts = Post.findPosts();

    return ListPosts;
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
