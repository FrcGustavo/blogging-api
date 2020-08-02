/*import express, { Router } from 'express';
import supertest from 'supertest';

import CommentsRouter from '../components/comments/router';
import CommentsController from '../components/comments/controller';

const testServer = (router: any, path: string) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(path, router);
    return supertest(app);
};

const route = Router()
const controller = CommentsController();
CommentsRouter(route, controller);

describe('router - posts', () => {
    const request = testServer(route, '/api/comments');

    describe('GET /api/comments', () => {
        test('should response with status code 200', (done) => {
            request
                .get('/api/comments')
                .expect(200, done);
        });
    });

    describe('GET /api/comments', () => {
        test('should response with a message', (done) => {
            request
                .get('/api/comments')
                .end((err: any, res: any) => {
                    expect(res.text).toEqual('HOLA MUNDO');
                    done();
                });
        });
    });
});
*/