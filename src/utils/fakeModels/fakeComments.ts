export const mockComent = {
    _id: '5f2611228cfc8705d3f4ef89',
    post: '5eb268995a6c8f000a6a8be4',
    username: 'Francisco',
    body: 'excellent post',
    isDisabled: false,
    createdAt: '2020-08-02T01:04:34.265Z',
    updatedAt: '2020-08-02T01:04:34.265Z',
    _v: 0,
};

export const mockComentsList = [mockComent, mockComent];

const skip = () => {
    return mockComentsList;
};
const sort = () => {
    return { skip };
};
const limit = () => {
    return { sort };
};

const fakeModelComments = {
    countDocuments: async (filters: any) => {
        return mockComentsList.length;
    },
    find: (filters: any) => {
        return { limit };
    },
    create: async (param: any) => {
        return mockComent;
    },
};

export default fakeModelComments;
