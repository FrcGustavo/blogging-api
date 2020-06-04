import { Request, Response, NextFunction } from "express";
import * as suc from '../../router/success';

export default class Users {

  private service: any;
  private success: any;

  constructor(service: any, success: any = suc) {
    this.service = service;
    this.success = success
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

  async update(req: Request , res: Response, next: NextFunction): Promise<void> {
    try {
      this.success(res, 'user updated', false, 201);
    } catch (error) {
      next(error);
    }
  }

}