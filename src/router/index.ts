import { Application } from 'express';
import POSTS from '../components/posts';
import USERS from '../components/users';
import AUTH from '../components/auth';
import UPLOADS from '../components/uploads';
import COMMENTS from '../components/comments';

const ROUTER = (app: Application): void => {
	POSTS(app);
	USERS(app);
	AUTH(app);
	UPLOADS(app);
	COMMENTS(app);
};

export default ROUTER;
