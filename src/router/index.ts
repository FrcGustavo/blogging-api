import { Application } from 'express';
import API from '../components/api/router';
import POSTS from '../components/posts/router';
import USERS from '../components/users';
import AUTH from '../components/auth';

const ROUTER = (app: Application): void => {
  API(app);
  POSTS(app);
  USERS(app);
  AUTH(app);
};

export default ROUTER;
