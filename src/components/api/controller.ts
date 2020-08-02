import { Request, Response, NextFunction } from 'express';
import * as service from './service';
import { error } from '../../utils/debug';

/**
 * Render page home
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const index = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('pages/home');
	} catch (err) {
		error(err);
		next(err);
	}
};

/**
 * Render page to register
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('pages/signup');
	} catch (err) {
		error(err.message);
		next(err);
	}
};

/**
 * Register a new user and render login
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const register = async (req: Request, res: Response) => {
	const user = req.body;
	try {
		await service.create(user);
		res.render('pages/signin', {
			messages: [
				'user created successfully',
			],
		});
	} catch (err) {
		error(err.message);
		res.render('pages/signup', {
			errors: [
				err.message,
			],
		});
	}
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('pages/signin');
	} catch (err) {
		error(err.message);
		next(err);
	}
};

/**
 * Render page of login
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.body;
	try {
		const token: any = await service.logged(user);
		const userObj: any = { user: token };
		req.session = userObj;
		res.redirect('/');
	} catch (err) {
		error(err.message);
		next(err);
	}
};
