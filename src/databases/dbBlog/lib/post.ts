import { v4 } from 'uuid';
import { SetupPost } from '../types';

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

  return {
    findPosts,
    createPost,
    findPost,
  };
};

export default setupPost;
