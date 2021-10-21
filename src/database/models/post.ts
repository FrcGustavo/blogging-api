import Sequelize from 'sequelize';
import setupDatabase from '../lib/db';
import { databaseConfig } from '../types';

const setupPostModel = (config: databaseConfig) => {
  const sequelize = setupDatabase(config);

  return sequelize.define('post', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    public: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};

export default setupPostModel;
