import { Router } from 'express';

import PostsRouter from '../../../components/posts/router';
import PostsController from '../../../components/posts/controller';
import success from '../../../router/success';

import testServer from '../../../utils/fakeServer/testServer';

const router = Router();
const controller = PostsController(fakeServicePosts, success);
PostsRouter(router, controller, fakePassport);

describe('router - posts', () => {
    const request = testServer(router, '/api/posts');
});