import {
  PostEntityContract,
  // PostItem,
  // PostsList,
  // UpdatePostItem,
  // CreatePostItem,
} from './types';
// import { setupDatabaseBlog } from '../../../databases';

export class PostEntity implements PostEntityContract {
  // async findAll() {
  //   const { Post } = await setupDatabaseBlog();
  //   const posts = await Post.findPosts();
  //   const listPosts: PostsList = posts.map(({ uuid, title, isPublic }) => ({
  //     uuid,
  //     title,
  //     isPublic,
  //   }));
  //   return listPosts;
  // }
  // async findOne(uuid: string) {
  //   const { Post } = await setupDatabaseBlog();
  //   const foundPost = await Post.findPost(uuid);
  //   if (!foundPost) {
  //     throw new Error('Post not found');
  //   }
  //   const post: PostItem = {
  //     uuid: foundPost.uuid,
  //     title: foundPost.title,
  //     isPublic: foundPost.isPublic,
  //   };
  //   return post;
  // }
  // async create(post: CreatePostItem) {
  //   const { Post } = await setupDatabaseBlog();
  //   const createdPost = await Post.createPost(post);
  //   return createdPost;
  // }
  // async update(uuid: string, data: UpdatePostItem) {
  //   const { Post } = await setupDatabaseBlog();
  //   const updatedPost = Post.updatePost(uuid, data);
  //   return updatedPost;
  // }
  // async delete(uuid: string) {
  //   const { Post } = await setupDatabaseBlog();
  //   const deletedPost = Post.deletePost(uuid);
  //   return deletedPost;
  // }
}
