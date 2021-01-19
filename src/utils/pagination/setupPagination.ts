export const setupPagination = (
	query = {
		limit: 10,
		sort_name: '_id',
		sort: -1,
		page: 1,
	}
) => {
	const limit = Number(query.limit) || 10;
	const sortName = query.sort_name ? String(query.sort_name) : '_id';
	const sortValue = Number(query.sort) || -1;
	const skip = (Number(query.page || 1) - 1) * limit;

	return {
		limit,
		skip,
		sort: {
			[sortName]: sortValue,
		},
		page: query.page || 1,
	};
};

export default setupPagination;
