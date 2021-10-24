import setupSequelize from './lib/db';
import setupPost from './lib/post';
import setupPostModel from './models/post';
import { DatabaseConfig } from './types';

const setupDatabase = async (config: DatabaseConfig) => {
  const sequelize = setupSequelize(config);
  const PostModel = setupPostModel(config);

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  const Post = setupPost(PostModel);

  return { Post };
};

export default setupDatabase;
