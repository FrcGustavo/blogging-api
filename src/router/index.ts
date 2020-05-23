import { Application } from 'express';
import API from '../components/api/router';
import POSTS from '../components/posts/router';

const ROUTER = (app: Application): void => {
  API(app);
  POSTS(app);
};

export default ROUTER;
