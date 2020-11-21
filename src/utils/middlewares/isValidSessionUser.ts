import { Request, Response, NextFunction } from 'express';

const isValidSessionUser = (url: string) => (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).session || !(req as any).session.user) { res.redirect(url); }
	else { next(); }
};

export default isValidSessionUser;
