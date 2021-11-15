import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { DatabaseConfig } from '../types';

dotenv.config();

const config: DatabaseConfig = {
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  host: process.env.DB_HOST || '',
  dialect: (process.env.DB_DIALECT as Dialect) || '',
  setup: (process.env.DB_SETUP as unknown as boolean) || false,
};

export default config;
