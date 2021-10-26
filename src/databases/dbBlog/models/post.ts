import { DataTypes } from 'sequelize';
import setupDatabase from '../lib/db';
import { PostInstance, SetupPostModel } from '../types';

const setupPostModel: SetupPostModel = (config) => {
  const sequelize = setupDatabase(config);

  return sequelize.define<PostInstance>('post', {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};

export default setupPostModel;
