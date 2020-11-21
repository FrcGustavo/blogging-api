import { Router } from 'express';

import CommentsRouter from '../../../components/comments/router';
import CommentsController from '../../../components/comments/controller';
import success from '../../../router/success';
import { mockComment } from '../../../utils/fakeModels/fakeComments';
import fakeCommentsService from '../../../utils/fakeServices/fakeCommentsService';
import fakePassport from '../../../utils/fakeUtils/fakePassport';

import testServer from '../../../utils/fakeServer/testServer';

const route = Router()
const controller = CommentsController(fakeCommentsService, success);
CommentsRouter(route, controller, fakePassport);

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

		describe('GET /api/comments/:id', () => {
				test('should response with status code 200', (done) => {
						request
								.get(`/api/comments/${mockComment._id}`)
								.expect(200, done);
				});

				test('should response with a message', (done) => {
						request
								.get(`/api/comments/${mockComment._id}`)
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
								.get('/api/comments/error')
								.end((err: any, res: any) => {
										expect(res.body).toEqual({});
										done();
								});
				});
		});

		describe('POST /api/comments', () => {
				test('should response with status code 201', (done) => {
						request
								.post('/api/comments')
								.send(mockComment)
								.expect(201, done);
				});

				test('should response with a new comment', (done) => {
						request
								.post('/api/comments')
								.send(mockComment)
								.end((err: any, res: any) => {
										expect(res.body).toEqual({
												error: false,
												status: 201,
												message: 'comment created',
												body: 'request is successfully',
										});
										done();
								});
				});

				test('should response with an error', (done) => {
						request
								.post('/api/comments')
								.send({ error: true })
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
