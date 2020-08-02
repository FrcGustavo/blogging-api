import PostsService from '../../../components/posts/service';
import fakeModelPosts, { mockPostsLits, mockPost } from '../../../utils/fakeModels/fakePosts';
import requireParams from '../../../utils/params/requireParams';
import validParams from '../../../utils/params/validParams';
import setupPagination from '../../../utils/pagination/setupPagination';
import toDoPagination from '../../../utils/pagination/toDoPagination';


describe('service - posts', () => {
    const service = PostsService(fakeModelPosts, validParams, requireParams, setupPagination, toDoPagination);
    describe('findAll', () => {
        test('should return a list of posts', async () => {
            const result = await service.findAll({});
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

    describe('findByAuthor', () => {
        test('should return a list of posts', async () => {
            const result = await service.findByAuthor(mockPost._id, {});
            const expected = {
                posts: mockPostsLits.map(
                    ({
                        _id,
                        title,
                        cover,
                        body,
                        description,
                        slug,
                        keywords,
                        views,
                        timeShared,
                        likes,
                        isPublic,
                    }) => ({
                        id: _id,
                        title,
                        cover,
                        body,
                        description,
                        slug,
                        keywords,
                        views,
                        timeShared,
                        likes,
                        isPublic,
                    })),
                pagination: {
                    page: 1,
                    pages: 1,
                    total: 2,
                },
            }
            expect(result).toEqual(expected);
        });
    });

    describe('findBySlug', () => {
        test('should return a post', async () => {
            const {
                _id: id,
                user,
                userCover,
                username,
                title,
                cover,
                description,
                keywords,
                views,
                timeShared,
                likes,
                createdAt,
            } = mockPost;
            const result = await service.findBySlug(mockPost.slug);
            const expected = {
                id,
                user,
                userCover,
                username,
                title,
                cover,
                body: '<h1 id=\"titleinformatmarckdown\">Title in format marckdown</h1>',
                description,
                keywords,
                views,
                timeShared,
                likes,
                createdAt,
            }
            expect(result).toEqual(expected);
        });

        test('should generate a error', async () => {
            try {
                await service.findBySlug('error');
            } catch (error) {
                const { message } = error;
                const expected = 'the resource error not found';
                expect(message).toEqual(expected);
            }
        });
    });

});