import { Router } from 'express';
import passport from 'passport';
import '../../utils/auth/strategies/jwt';
import CommentsRouter from './router';
import CommentsController from "./controller";
import CommentsService from "./service";
import Comment from '../../models/comments';
import success from '../../router/success';
import requireParams from '../../utils/params/requireParams';
import validParams from '../../utils/params/validParams';
import setupPagination from '../../utils/pagination/setupPagination';
import toDoPagination from '../../utils/pagination/toDoPagination';

const COMMENTS = (app: any) => {
    const router = Router();
    const service = CommentsService(Comment, validParams, requireParams, setupPagination, toDoPagination);
    const controller = CommentsController(service, success);

    app.use('/api/comments', router);
    CommentsRouter(router, controller, passport);
};

export default COMMENTS;
