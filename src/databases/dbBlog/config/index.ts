import dotenv from 'dotenv';
import { DatabaseConfig } from '../types';

dotenv.config();

const config: DatabaseConfig = {
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  host: process.env.DB_HOST || '',
  dialect: process.env.DB_DIALECT || '',
};

export default config;