import dotenv from 'dotenv';
import { DatabaseConfig } from '../databases/dbBlog/types';
import { DatabaseConfig as MongoDatabaseConfig } from '../databases/mongodb/index';

dotenv.config();

type ServerConfig = {
  mode: string;
  port: string | number;
  logPrefix: string;
  secretSession: string;
  secretJWT: string;
};

const dialect =
  (process.env.POSTGRES_DIALECT as
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mariadb'
    | 'mssql') || 'mysql';

const config: {
  srv: ServerConfig;
  db: DatabaseConfig;
  mongo: MongoDatabaseConfig;
} = {
  srv: {
    mode: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000',
    logPrefix: process.env.LOG_PREFIX || 'app',
    secretSession: process.env.SECRET_SESSION || 'my_secret-key',
    secretJWT: process.env.SECRET_JTW || 'my_secret-key',
  },
  db: {
    host: process.env.POSTGRES_HOST || '',
    username: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    dialect,
    setup: process.env.POSTGRES_SETUP === 'true' || false,
  },
  mongo: {
    url: process.env.MONGO_HOST || '',
    username: process.env.MONGO_USERNAME || '',
    password: process.env.MONGO_PASSWORD || '',
    database: process.env.MONGO_DATABASE || '',
  },
};

export default config;
