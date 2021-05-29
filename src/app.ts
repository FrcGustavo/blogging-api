import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  config() {
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
