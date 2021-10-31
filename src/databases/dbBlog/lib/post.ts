import { v4 } from 'uuid';
import { SetupPost, PostUpgradeAttributes } from '../types';

const setupPost: SetupPost = (postModel) => {
  const findPosts = async () => {
    const posts = await postModel.findAll();
    return posts;
  };

  const createPost = async ({
    title,
    isPublic = false,
  }: {
    title: string;
    isPublic?: boolean;
  }) => {
    const createdPost = await postModel.create({
      uuid: v4(),
      title,
      isPublic,
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

  return {
    findPosts,
    createPost,
    findPost,
    updatePost,
  };
};

export default setupPost;
