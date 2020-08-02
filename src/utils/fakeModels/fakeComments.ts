export const mockComents = {
    _id: '5f2611228cfc8705d3f4ef89',
    post: '5eb268995a6c8f000a6a8be4',
    username: 'Francisco',
    body: 'excellent post',
    isDisabled: false,
    createdAt: '2020-08-02T01:04:34.265Z',
    updatedAt: '2020-08-02T01:04:34.265Z',
    _v: 0,
};

const fakeModelComments = {
    create: async (param: any) => {
        return mockComents;
    }
};

export default fakeModelComments;
