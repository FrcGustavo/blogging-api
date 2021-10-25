import { Model, ModelCtor, Optional, Options } from 'sequelize';

export type DatabaseConfig = Options & { setup: boolean };

interface PostAttributes {
  uuid: string;
  title: string;
  isPublic: boolean;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'uuid'> {}

export interface PostInstance
  extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {}

export type PostModel = ModelCtor<PostInstance>;

export type SetupPostModel = (config: DatabaseConfig) => PostModel;

export type PostLib = {
  findPosts: () => Promise<PostInstance[]>;
};

export type SetupPost = (postModel: PostModel) => PostLib;

export type Services = {
  Post: PostLib;
};
export type SetupDatabase = (config: DatabaseConfig) => Promise<Services>;
