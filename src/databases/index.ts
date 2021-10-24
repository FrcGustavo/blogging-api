import setupSequelize from './dbBlog';
import { DatabaseConfig } from './dbBlog/types';

let services: any = null;
let Post: any = null;

export const setupDatabaseBlog = async (config?: DatabaseConfig) => {
  if (services === null && Post === null && config) {
    services = await setupSequelize(config);
    Post = services.Post;

    return { Post };
  }

  return { Post };
};
