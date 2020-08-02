import CommentsService from '../../../components/comments/service';
import fakeModelComments, { mockComment, mockCommentsList } from '../../../utils/fakeModels/fakeComments';
import validParams from '../../../utils/params/validParams';
import requireParams from '../../../utils/params/requireParams';
import setupPagination from '../../../utils/pagination/setupPagination';
import toDoPagination from '../../../utils/pagination/toDoPagination';

describe('service - comments', () => {
    const service = CommentsService(fakeModelComments, validParams, requireParams, setupPagination, toDoPagination);
    describe('insertComment', () => {
        test('should return a new comment', async () => {
            const { post, username, body } = mockComment;
            const result = await service.insertComment({ post, username, body });
            expect(result).toEqual(mockComment);
        });
    });

    describe('findAll', () => {
        test('should return a list of comments', async () => {
            const result = await service.findAll({});
            const expected = {
                comments: mockCommentsList.map(
                    ({ _id, post, username, body, createdAt }) => ({ id: _id, post, username, body, createdAt })),
                pagination: {
                    page: 1,
                    pages: 1,
                    total: 2,
                },
            }
            expect(result).toEqual(expected);
        });
    });

    describe('findByPost', () => {
        test('should return a list of comments own post', async () => {
            const result = await service.findByPost(mockComment._id, {});
            const expected = {
                comments: mockCommentsList.map(
                    ({ username, body, createdAt }) => ({ username, body, createdAt })),
                pagination: {
                    page: 1,
                    pages: 1,
                    total: 2,
                },
            }
            expect(result).toEqual(expected);
        });
    });

    describe('deleteComment', () => {
        test('should return a false value', async () => {
            const result = await service.deleteComment(mockComment._id);
            const expected = false;
            expect(result).toEqual(expected);
        });

        test('should generate an error', async () => {
            try {
                await service.deleteComment('error');
            } catch (error) {
                const result = error.message;
                const expected = 'error to delete comment';
                expect(result).toEqual(expected);

            }
        });
    });
});