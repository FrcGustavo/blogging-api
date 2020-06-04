import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import passsport from 'passport';
import succcess from '../../router/success';
import config from '../../config';

import '../../utils/auth/strategies/basic';

export default class Users {

  private service: any;
  private success: any;
  private passport: any;

  constructor(service: any, passport: any = passsport, success: any = succcess) {
    this.service = service;
    this.success = success
    this.passport = passport;
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  async create(req: Request , res: Response, next: NextFunction): Promise<void> {
    const { body: user } = req;
    try {
      const createdUser = await this.service.createUser(user);
      this.success(res, 'user created', createdUser, 201);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request , res: Response, next: NextFunction): Promise<void> {
    this.passport.authenticate('basic', (err: any, user: any) => {
      try {
        if(err || !user) {
          next(new Error('unauthorized'));
        }

        req.login(user, { session: false }, async (error: any) => {
          if(error) {
            next(error);
          }

          const { _id: id, firstName, email } = user;
          const payload = {
              sub: id,
              firstName,
              email,
          };

          const token = jwt.sign(payload, config.srv.secretJWT, {
            expiresIn: '15m'
          });

          return res.status(200).json({
              token, user: { id, firstName, email }
          });

        });

      } catch (error) {
        next(error);
      }
    })(req, res, next);
  }

  async profile(req: Request , res: Response, next: NextFunction): Promise<void> {
    const { id: userId } = req.params;
    try {
      const user = await this.service.getUser(userId);
      this.success(res, 'user retrieved', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request , res: Response, next: NextFunction): Promise<void> {
    const user: any= req.user;
    const { _id: userId } = user._doc;
    const { body: newUser } = req;

    try {
      const updatedUser = await this.service.update(userId, newUser);
      this.success(res, 'user updated', updatedUser, 200);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request , res: Response, next: NextFunction): Promise<void> {
    const user: any= req.user;
    const { _id: userId } = user._doc;
    try {
      const deletedUser = await this.service.destroy(userId);
      this.success(res, 'user deleted', deletedUser, 200);
    } catch (error) {
      next(error);
    }
  }
}