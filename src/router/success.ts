import { Response } from 'express';

export const success = (res: Response, message: string, data: object | boolean, status: number): void => {
	res
		.status(status)
		.json({
			error: false,
			status,
			message,
			body: data,
		});
};

export default success;
