import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import { setupDatabaseBlog } from './databases';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    setupDatabaseBlog({
      host: '172.20.0.2',
      username: 'root',
      password: '123456',
      database: 'bloging',
      dialect: 'postgres',
      setup: false,
    });
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(logger('dev'));
  }

  getIntance() {
    return this.app;
  }
}

export default App;
