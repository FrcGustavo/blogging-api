import { SetupPost } from '../types';

const setupPost: SetupPost = (postModel) => {
  const findPosts = async () => {
    const posts = await postModel.findAll();
    return posts;
  };

  return {
    findPosts,
  };
};

export default setupPost;
