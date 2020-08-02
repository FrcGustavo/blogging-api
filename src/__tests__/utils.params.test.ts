import validParams from '../utils/params/validParams';
import requireParams from '../utils/params/requireParams';

describe('utils - params', () => {
	const badMock = {
		body: 'here is a description',
		cover: 'my image',
		isPublic: true,
		isAvtive: false,
	};
	const mock = {
		title: 'this is a test',
		body: 'here is a description',
		cover: 'my image',
		isPublic: true,
		isAvtive: false,
	};

	const require = [
		'title',
	];

	const valid = [
		...require, 'body', 'cover',
	];

	test('should return a part valid this object', () => {
		const params = validParams(valid, mock);
		expect(params).toMatchObject({
			title: 'this is a test',
			body: 'here is a description',
			cover: 'my image',
		});
	});

	test('should return a same mock', () => {
		const params = requireParams(require, mock);
		expect(params).toMatchObject({
			title: 'this is a test',
			body: 'here is a description',
			cover: 'my image',
			isPublic: true,
			isAvtive: false,
		});
	});

	test('should return a part valid its object', () => {
		try {
			requireParams(require, badMock);
		} catch (error) {
			const msg = error.message;
			expect(msg).toEqual('Field title is required');
		}
	});
});
