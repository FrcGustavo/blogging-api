/* eslint-disable no-undef */
import testServer from '../utils/mocks/testServer';
import { serviceMock, PostsMock } from '../utils/mocks/postsMock';
import PostController from '../components/posts/controller';
import router from '../components/posts/router';
const controller = PostController(serviceMock)

describe('router - posts', () => {
  const request = testServer(router, controller);

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
            body: {
              post: PostsMock,
              pagination: {
                totalPosts: PostsMock.length,
                totalPages: 1,
                page: 1,
              },
            },
          });
          done();
        });
    });

    test('should response with a empty object', (done) => {
      request
        .get('/api/posts')
        .end((err: any, res: any) => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });

  describe('GET /api/posts/:slug', () => {
    const { slug } = PostsMock[0];
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
            body: PostsMock[0],
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
/*
  describe('POST /api/posts/', () => {
    const post = PostsMock[0];
    test('should response with status code 201', (done) => {
      request
        .post('/api/posts')
        .send(post)
        .expect(201, done);
    });

    test('should response with a post created', (done) => {
      request
        .post('/api/posts')
        .send(post)
        .end((err: any, res: any) => {
          expect(res.body).toEqual({
            error: false,
            message: 'post created',
            status: 201,
            body: PostsMock[0],
          });
          done();
        });
    });

    test('should response with a empty object', (done) => {
      request
        .post('/api/posts')
        .send({})
        .end((err: any, res: any) => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });

  describe('PATCH /api/posts/', () => {
    const { slug } = PostsMock[0];
    const post = PostsMock[0];
    test('should response with status code 200', (done) => {
      request
        .patch(`/api/posts/${slug}`)
        .send(post)
        .expect(200, done);
    });

    test('should response with a post updated', (done) => {
      request
        .patch(`/api/posts/${slug}`)
        .send(post)
        .end((err: any, res: any) => {
          expect(res.body).toEqual({
            error: false,
            message: 'post updated',
            status: 200,
            body: PostsMock[0],
          });
          done();
        });
    });

    test('should response with a empty object', (done) => {
      request
        .patch(`/api/posts/${slug}`)
        .send({})
        .end((err: any, res: any) => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });

  describe('DELETE /api/posts/', () => {
    const { slug } = PostsMock[0];
    const post = PostsMock[0];
    test('should response with status code 200', (done) => {
      request
        .delete(`/api/posts/${slug}`)
        .send(post)
        .expect(200, done);
    });

    test('should response with a post deleted', (done) => {
      request
        .delete(`/api/posts/${slug}`)
        .send(post)
        .end((err: any, res: any) => {
          expect(res.body).toEqual({
            error: false,
            message: 'post deleted',
            status: 200,
            body: false,
          });
          done();
        });
    });

    test('should response with a empty object', (done) => {
      request
        .delete('/api/posts/error')
        .send({})
        .end((err: any, res: any) => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });*/
});
