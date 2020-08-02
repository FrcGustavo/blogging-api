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
		},
		insert: async (post: any, user: any) => {
				if (post.error === true) {
						throw false;
				}
				return 'request is successfully';
		},
		update: async (slug: any, post: any, authorId: any) => {
				if (post.error === true) {
						throw false;
				}
				return 'request is successfully';
		},
		destroy: async (slug: string, authorId: string) => {
				if (slug === 'error') {
						throw false;
				}
				return 'request is successfully';
		},
		findByAuthor: async (authorId: string, { error }: any) => {
				return 'request is successfully';
		},
};

export default fakePostsService;
