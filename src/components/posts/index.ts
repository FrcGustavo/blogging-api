import { Router } from 'express';
import passport from 'passport';
import PostsRouter from './router';
import PostsController from './controller';
import PostsService from './service';
import Post from '../../models/posts';
import success from '../../router/success';
import requireParams from '../../utils/params/requireParams';
import validParams from '../../utils/params/validParams';
import setupPagination from '../../utils/pagination/setupPagination';
import toDoPagination from '../../utils/pagination/toDoPagination';

const POST = (app: any) => {
  const router = Router();
  const service = PostsService(
    Post,
    validParams,
    requireParams,
    setupPagination,
    toDoPagination
  );
  const controller = PostsController(service, success);

  app.use('/api/posts', router);
  PostsRouter(router, controller, passport);
};

export default POST;
