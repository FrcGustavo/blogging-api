import { PostEntityContract, PostItem, PostsList } from './types';
import { setupDatabaseBlog } from '../../../databases';

const POST: PostItem = {
  uuid: '',
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

  async findOne(uuid: string) {
    const { Post } = await setupDatabaseBlog();
    const foundPost = await Post.findPost(uuid);

    if (!foundPost) {
      return POST;
    }

    const post: PostItem = {
      uuid: foundPost.uuid,
      title: foundPost.title,
      isPublic: foundPost.isPublic,
    };

    return post;
  }

  async create(post: PostItem) {
    // const { Post } = await setupDatabaseBlog()
    // await Post.createPost({ title: 'ESTE ES MI PRIMER POST' })
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
