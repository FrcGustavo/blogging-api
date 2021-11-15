import { v4 } from 'uuid';
import {
  SetupPost,
  PostUpgradeAttributes,
  PostCreationAttributes,
} from '../types';

const setupPost: SetupPost = (postModel) => {
  const findPosts = async () => {
    const posts = await postModel.findAll();
    return posts;
  };

  const createPost = async (data: PostCreationAttributes) => {
    const createdPost = await postModel.create({
      uuid: v4(),
      title: data.title,
      isPublic: data.isPublic,
    });

    return createdPost.uuid;
  };

  const findPost = async (uuid: string) => {
    const post = await postModel.findOne({ where: { uuid } });
    return post;
  };

  const updatePost = async (uuid: string, data: PostUpgradeAttributes) => {
    const post = await postModel.update(data, { where: { uuid } });
    return Boolean(post[0]);
  };

  const deletePost = async (uuid: string) => {
    const post = await postModel.destroy({ where: { uuid } });
    return Boolean(post);
  };

  return {
    findPosts,
    createPost,
    findPost,
    updatePost,
    deletePost,
  };
};

export default setupPost;
