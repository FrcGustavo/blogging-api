import { Router } from 'express';

import PostsRouter from '../../../components/posts/router';
import PostsController from '../../../components/posts/controller';
import success from '../../../router/success';
import { mockPost } from '../../../utils/fakeModels/fakePosts';
import fakePostsService from '../../../utils/fakeServices/fakePostsService'
import fakePassport from '../../../utils/fakeUtils/fakePassport';

import testServer from '../../../utils/fakeServer/testServer';

const router = Router();
const controller = PostsController(fakePostsService, success);
PostsRouter(router, controller, fakePassport);

describe('router - posts', () => {
    const request = testServer(router, '/api/posts');

    describe('GET /api/posts', () => {
        const query = { limit: 10, sort: '-_id', page: 1 };
        test('should response with status code 200', (done) => {
          request
            .get('/api/posts')
            .query(query)
            .expect(200, done);
        });

        test('should response with a list of posts', (done) => {
            request
                .get('/api/posts')
                .query(query)
                .end((err: any, res: any) => {
                    expect(res.body).toEqual({
                        error: false,
                        message: 'posts listed',
                        status: 200,
                        body: 'request is successfully',
                    });
                    done();
                });
        });

        test('should response with a empty object', (done) => {
            request
                .get('/api/posts?error=true')
                .end((err: any, res: any) => {
                    expect(res.body).toEqual({});
                    done();
                });
        });

    });

    describe('GET /api/posts/:slug', () => {
        const { slug } = mockPost;
        test('should response with status code 200', (done) => {
          request
            .get(`/api/posts/${slug}`)
            .expect(200, done);
        });

        test('should response with a post', (done) => {
          request
            .get(`/api/posts/${slug}`)
            .end((err: any, res: any) => {
              expect(res.body).toEqual({
                error: false,
                message: 'post retrieved',
                status: 200,
                body: 'request is successfully',
              });
              done();
            });
        });

        test('should response with a empty object', (done) => {
          request
            .get('/api/posts/error')
            .end((err: any, res: any) => {
              expect(res.body).toEqual({});
              done();
            });
        });
    });

    describe('POST /api/posts/', () => {
        test('should response with status code 201', (done) => {
          request
            .post('/api/posts')
            .send(mockPost)
            .expect(201, done);
        });

        test('should response with a post created', (done) => {
          request
            .post('/api/posts')
            .send(mockPost)
            .end((err: any, res: any) => {
              expect(res.body).toEqual({
                error: false,
                message: 'post created',
                status: 201,
                body: 'request is successfully',
              });
              done();
            });
        });

        test('should response with a empty object', (done) => {
          request
            .post('/api/posts')
            .send({ error: true })
            .end((err: any, res: any) => {
              expect(res.body).toEqual({});
              done();
            });
        });
    });

    describe('PATCH /api/posts/', () => {
        const { slug } = mockPost;
        test('should response with status code 200', (done) => {
          request
            .patch(`/api/posts/${slug}`)
            .send(mockPost)
            .expect(200, done);
        });

        test('should response with a post updated', (done) => {
          request
            .patch(`/api/posts/${slug}`)
            .send(mockPost)
            .end((err: any, res: any) => {
              expect(res.body).toEqual({
                error: false,
                message: 'post updated',
                status: 200,
                body: 'request is successfully',
              });
              done();
            });
        });

        test('should response with a empty object', (done) => {
          request
            .patch(`/api/posts/${slug}`)
            .send({ error: true })
            .end((err: any, res: any) => {
              expect(res.body).toEqual({});
              done();
            });
        });
    });

    describe('DELETE /api/posts/', () => {
        const { slug } = mockPost;
        test('should response with status code 200', (done) => {
          request
            .delete(`/api/posts/${slug}`)
            .expect(200, done);
        });

        test('should response with a post deleted', (done) => {
          request
            .delete(`/api/posts/${slug}`)
            .end((err: any, res: any) => {
              expect(res.body).toEqual({
                error: false,
                message: 'post deleted',
                status: 200,
                body: 'request is successfully',
              });
              done();
            });
        });

        test('should response with a empty object', (done) => {
          request
            .delete('/api/posts/error')
            .end((err: any, res: any) => {
              expect(res.body).toEqual({});
              done();
            });
        });
      });

      describe('GET /api/posts/author', () => {
        const { slug } = mockPost;
        test('should response with status code 200', (done) => {
          request
            .get('/api/posts/author')
            .expect(200, done);
        });

        test('should response with a post getd', (done) => {
          request
            .get('/api/posts/author')
            .end((err: any, res: any) => {
              expect(res.body).toEqual({
                error: false,
                message: 'posts listed',
                status: 200,
                body: 'request is successfully',
              });
              done();
            });
        });
      });
});