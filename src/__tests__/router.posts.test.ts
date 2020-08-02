/* eslint-disable no-undef */
/*
import testServer from '../utils/mocks/testServer';
import { serviceMock, PostsMock } from '../utils/mocks/postsMock';
import PostController from '../components/posts/controller';
import router from '../components/posts/router';
const controller = PostController(serviceMock)

describe('router - posts', () => {
  const request = testServer(router, controller);


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
  });
});*/
