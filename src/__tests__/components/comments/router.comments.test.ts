import express, { Router } from 'express';
import supertest from 'supertest';

import CommentsRouter from '../../../components/comments/router';
import CommentsController from '../../../components/comments/controller';

import success from '../../../router/success';
import { mockComment } from '../../../utils/fakeModels/fakeComments';
import fakeServiceComments from '../../../utils/fakeServices/fakeCommentsService';

const testServer = (router: any, path: string) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(path, router);
    return supertest(app);
};

const route = Router()
const controller = CommentsController(fakeServiceComments, success);
CommentsRouter(route, controller);

describe('router - posts', () => {
    const request = testServer(route, '/api/comments');

    describe('GET /api/comments', () => {
        test('should response with status code 200', (done) => {
            request
                .get('/api/comments')
                .expect(200, done);
        });

        test('should response with a message', (done) => {
            request
                .get('/api/comments')
                .end((err: any, res: any) => {
                    expect(res.body).toEqual({
                        error: false,
                        status: 200,
                        message: 'comments listed',
                        body: 'request is successfully',
                    });
                    done();
                });
        });

        test('should response with an error', (done) => {
            request
                .get('/api/comments?error=true')
                .end((err: any, res: any) => {
                    expect(res.body).toEqual({});
                    done();
                });
        });
    });

    describe('DELETE /api/comments', () => {
        test('should response with status code 200', (done) => {
            request
                .delete(`/api/comments/${mockComment._id}`)
                .expect(200, done);
        });

        test('should response with a comment deleted', (done) => {
            request
                .delete(`/api/comments/${mockComment._id}`)
                .end((err: any, res: any) => {
                    expect(res.body).toEqual({
                        error: false,
                        status: 200,
                        message: 'comment deleted',
                        body: 'request is successfully',
                    });
                    done();
                });
        });

        test('should response with an error', (done) => {
            request
                .delete('/api/comments/error')
                .end((err: any, res: any) => {
                    expect(res.body).toEqual({});
                    done();
                });
        });
    });
});
