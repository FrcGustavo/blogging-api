import setupSequelize from './lib/db';
import setupPost from './lib/post';
import setupPostModel from './models/post';
import { SetupDatabase } from './types';

const setupDatabase: SetupDatabase = async (config) => {
  const sequelize = setupSequelize(config);
  const postModel = setupPostModel(config);

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  const Post = setupPost(postModel);

  return { Post };
};

export default setupDatabase;
