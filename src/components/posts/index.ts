import { Router } from 'express';
import passport from 'passport';
import PostsRouter from './router';

const POST = (app: any) => {
    const router = Router();
    const service =
    const controller = 

    app.use('/api/posts', router);
    PostsRouter(router, controller, passport);
};

export default POST;