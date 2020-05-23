import { Request, Response, NextFunction } from "express";

const isValidSessionUser = (url: string) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.user) res.redirect(url);
  else next();
};

export default isValidSessionUser;
