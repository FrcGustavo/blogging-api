import mongoose from 'mongoose';
import { mongo } from '../../utils/debbug';

export type DatabaseConfig = {
  url: string;
  username: string;
  password: string;
  database: string;
};

type SetupMongoDatabase = (config: DatabaseConfig) => Promise<void>;

const setupMongoDataBase: SetupMongoDatabase = async ({
  url,
  username,
  password,
  database,
}) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: username,
      pass: password,
      dbName: database,
    });
    mongo('Connection is success');
  } catch (err) {
    mongo(err);
  }
};

export default setupMongoDataBase;
