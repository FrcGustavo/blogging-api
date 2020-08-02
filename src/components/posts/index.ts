import { Router } from 'express';
import passport from 'passport';
import PostsRouter from './router';
import PostsController from './controller';
import Post from '../../models/posts'
import success from '../../router/success';

const POST = (app: any) => {
    const router = Router();
    const service =
    const controller = PostsController(service, success);

    app.use('/api/posts', router);
    PostsRouter(router, controller, passport);
};

export default POST;