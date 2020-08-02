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
                comments: mockCommentsList.map(({ username, body, createdAt }) => ({ username, body, createdAt })),
                pagination: {
                    page: 1,
                    pages: 1,
                    total: 2,
                },
            }
            expect(result).toEqual(expected);
        });
    });
});