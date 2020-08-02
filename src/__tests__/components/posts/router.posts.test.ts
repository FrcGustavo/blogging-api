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
    
    });

});