import { PostEntityContract, PostItem, PostsList } from './types';
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
    const posts = await Post.findPosts();

    const listPosts: PostsList = posts.map(({ uuid, title, isPublic }) => ({
      uuid,
      title,
      isPublic,
    }));

    return listPosts;
  }

  async findOne() {
    return POSTS[0];
  }

  async create(post: PostItem) {
    // const { Post } = await setupDatabaseBlog()
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
