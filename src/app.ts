import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import { setupDatabaseBlog, setupMongoDataBase } from './databases';
import { logger as loggerApp } from './utils/debbug';
import config from './config';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    setupDatabaseBlog(config.db).catch(() => {});
    setupMongoDataBase(config.mongo);
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      logger(config.srv.logger, { stream: { write: (msg) => loggerApp(msg) } })
    );
  }

  getIntance() {
    return this.app;
  }
}

export default App;
