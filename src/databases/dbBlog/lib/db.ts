import { Sequelize, Options } from 'sequelize';
import { DatabaseConfig } from '../types';

let sequelize: Sequelize | null = null;

const setupSequelize = (config: DatabaseConfig): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(config as Options);
  }

  return sequelize;
};

export default setupSequelize;
