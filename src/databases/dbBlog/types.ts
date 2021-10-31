import { Model, ModelCtor, Optional, Options } from 'sequelize';

export type DatabaseConfig = Options & { setup: boolean };

export interface PostAttributes {
  uuid: string;
  title: string;
  isPublic: boolean;
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, 'uuid'> {}
export interface PostUpgradeAttributes
  extends Partial<Omit<PostAttributes, 'uuid'>> {}

export interface PostInstance
  extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {}

export type PostModel = ModelCtor<PostInstance>;

export type SetupPostModel = (config: DatabaseConfig) => PostModel;

export type PostLib = {
  findPosts: () => Promise<PostInstance[]>;
  createPost: (post: { title: string; isPublic?: boolean }) => Promise<string>;
  findPost: (uuid: string) => Promise<PostInstance | null>;
  updatePost: (uuid: string, data: PostUpgradeAttributes) => Promise<boolean>;
};

export type SetupPost = (postModel: PostModel) => PostLib;

export type Services = {
  Post: PostLib;
};

export type SetupDatabase = (config: DatabaseConfig) => Promise<Services>;
