import {
  PollEntityContract,
  PollItem,
  PollsList,
  // UpdatePostItem,
  // CreatePostItem,
} from './types';
import { Polls } from "../models";
// import { setupDatabaseBlog } from '../../../databases';

export class PollEntity implements PollEntityContract {
  async findAll() {
    const polls = await Polls.find();
    //   const { Post } = await setupDatabaseBlog();
    //   const posts = await Post.findPosts();
    const listPolls: PollsList = polls.map(({ id, title }) => ({
      uuid: id,
      title,
    }));
    return listPolls;
  }

  async findOne(uuid: string) {
    const foundPoll = await Polls.findById(uuid);
    //   const { Post } = await setupDatabaseBlog();
    //   const foundPost = await Post.findPost(uuid);
    if (!foundPoll) {
      throw new Error('Post not found');
    }
    const poll: PollItem = {
      uuid: foundPoll.id,
      title: foundPoll.name,
      questions: [],
      // isPublic: foundPost.isPublic,
    };

    return poll;
  }

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
