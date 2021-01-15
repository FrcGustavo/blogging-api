import { Request, Response, NextFunction } from 'express';

const isLogged = (req: Request, res: Response, next: NextFunction): void => {
	if ((req as any).session && (req as any).session.user) { res.redirect('/'); }
	else { next(); }
};

export default isLogged;
