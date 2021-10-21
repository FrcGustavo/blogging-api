import { Sequelize, Options } from 'sequelize';
import { databaseConfig } from '../types';

let sequelize: Sequelize | null = null;

const setupDatabase = (config: databaseConfig): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(config as Options);
  }

  return sequelize;
};

export default setupDatabase;
