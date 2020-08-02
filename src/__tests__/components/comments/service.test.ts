import CommentsService from '../../../components/comments/service';
import fakeModelComments, { mockComents } from '../../../utils/fakeModels/fakeComments';
import validParams from '../../../utils/params/validParams';
import requireParams from '../../../utils/params/requireParams';


describe('service - comments', () => {
    const service = CommentsService(fakeModelComments, validParams, requireParams);
    describe('insertComment', () => {
        test('should return a new comment', async () => {
            const { post, username, body } = mockComents;
            const result = await service.insertComment({ post, username, body });
            expect(result).toEqual(mockComents);
        });

    })
});