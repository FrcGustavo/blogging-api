import mongoose from 'mongoose';

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
    // console.log('Success');
  } catch (err) {
    // console.log('ERROR', err);
  }
};

export default setupMongoDataBase;
