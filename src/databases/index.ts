import setupSequelize from './dbBlog';
import { DatabaseConfig, PostLib, Services } from './dbBlog/types';

export { default as setupMongoDataBase } from './mongodb';

let services: Services;
let Post: PostLib;

export const setupDatabaseBlog = async (config?: DatabaseConfig) => {
  if (!services && !Post && config) {
    services = await setupSequelize(config);
    Post = services.Post;

    return { Post };
  }

  return { Post };
};
