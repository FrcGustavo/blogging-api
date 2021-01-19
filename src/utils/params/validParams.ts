export const validParams = (params: string[], body: any) => {
	const newParams: any = {};

	params.forEach((attr: string) => {
		if (Object.prototype.hasOwnProperty.call(body, attr)) {
			newParams[attr] = body[attr];
		}
	});

	return newParams;
};

export default validParams;
