const fakePostsService = {
    findAll: async ({ error }: any) => {
        if (error) {
            throw false;
        }
        return 'request is successfully';
    },
    findBySlug: async (slug: string) => {
        if (slug === 'error') {
            throw false;
        }
        return 'request is successfully';
    }
};

export default fakePostsService;
