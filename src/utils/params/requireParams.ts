/**
 * validate that necesary parameters existed
 * @param {Array} validParams
 * @param {Object} body
 */
const requireParams = (params: string[], body: any) => {
	params.forEach((field) => {
		if (body[field] === null || body[field] === undefined) {
			throw new Error(`Field ${field} is required`);
		}
	});

	return body;
};

export default requireParams;
