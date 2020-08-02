export const mockComment = {
    _id: '5f2611228cfc8705d3f4ef89',
    post: '5eb268995a6c8f000a6a8be4',
    username: 'Francisco',
    body: 'excellent post',
    isDisabled: false,
    createdAt: '2020-08-02T01:04:34.265Z',
    updatedAt: '2020-08-02T01:04:34.265Z',
    _v: 0,
};

export const mockCommentsList = [mockComment, mockComment];

const skip = () => {
    return mockCommentsList;
};
const sort = () => {
    return { skip };
};
const limit = () => {
    return { sort };
};

const fakeModelComments = {
    countDocuments: async (filters: any) => {
        return mockCommentsList.length;
    },
    find: (filters: any) => {
        return { limit };
    },
    create: async (param: any) => {
        return mockComment;
    },
    updateOne: async ({ _id }: any) => {
        if (_id === 'error') {
            return {};
        }
        return { nModified: 1 };
    }
};

export default fakeModelComments;
