export const mockPost = {
    _id: '5f2611228cfc8705d3f4ef89',
    user: '5eb268995a6c8f000a6a8be4',
    userCover: 'https://localhost:5000/api/uploads/myimg.jpg',
    username: 'Francisco',
    title: 'How to create a blog yourself',
    cover: 'https://localhost:5000/api/uploads/myimgcover.jpg',
    body: '# Title in format marckdown',
    description: 'excellent post',
    slug: 'how-to-create-a-blog-yourself',
    keywords: '',
    views: 0,
    timeShared: 0,
    likes: 0,
    isPublic: true,
    isDisabled: false,
    createdAt: '2020-08-02T01:04:34.265Z',
    updatedAt: '2020-08-02T01:04:34.265Z',
    _v: 0,
};

export const mockPostsLits = [mockPost, mockPost];

const skip = () => {
    return mockPostsLits;
};
const sort = () => {
    return { skip };
};
const limit = () => {
    return { sort };
};

const fakeModelPosts = {
    countDocuments: async (filters: any) => {
        return mockPostsLits.length;
    },
    find: (filters: any) => {
        return { limit };
    },
};

export default fakeModelPosts;
