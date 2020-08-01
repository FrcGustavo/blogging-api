import { info } from "console";
import { Router, Express } from 'express';
import CommentsRouter from './router';
import CommentsController from "./controller";

const COMMENTS = (app: any) => {
    const router = Router();
    const controller = CommentsController();


    app.use('/api/comments', router);
    CommentsRouter(router, controller);
};

export default COMMENTS;
