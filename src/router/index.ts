import { Application } from 'express';
import API from '../components/api/router';
import POSTS from '../components/posts/router';
import USERS from '../components/users';

const ROUTER = (app: Application): void => {
  API(app);
  POSTS(app);
  USERS(app);
};

export default ROUTER;
