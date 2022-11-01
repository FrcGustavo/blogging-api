import mongoose from 'mongoose';

const setupMongoDataBase = async () => {
  try {
    await mongoose.connect('mongodb://172.18.0.2:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: '',
      pass: '',
      dbName: '',
    });
    console.log('Success');
  } catch (err) {
    console.log('ERROR', err);
  }
};

export default setupMongoDataBase;
