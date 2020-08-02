import PostsService from '../../../components/posts/service';
import fakeModelPosts, { mockPostsLits } from '../../../utils/fakeModels/fakePosts';
import requireParams from '../../../utils/params/requireParams';
import validParams from '../../../utils/params/validParams';
import setupPagination from '../../../utils/pagination/setupPagination';
import toDoPagination from '../../../utils/pagination/toDoPagination';


describe('service - posts', () => {
    const service = PostsService(fakeModelPosts, validParams, requireParams, setupPagination, toDoPagination);
    describe('findAll', () => {
        test('should return a list of posts', async () => {
            const result = await service.findAll({});
            console.log(result);
            
            const expected = {
                posts: mockPostsLits.map(
                    ({ _id, title, cover, description, slug, }) => ({ id: _id, title, cover, description, slug })),
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