import { ModelCtor } from 'sequelize';

const setupPost = (PostModel: ModelCtor<any>) => {
  const findPosts = async () => {
    const posts = await PostModel.findAll();
    return posts;
  };

  return {
    findPosts,
  };
};

export default setupPost;
