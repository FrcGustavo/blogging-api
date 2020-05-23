import { Request, Response, NextFunction } from "express";
import * as suc from '../../router/success';

export default class Users {

  private service: any;
  private success: any;

  constructor(service: any, success: any = suc) {
    this.service = service;
    this.success = success
  }

  async update(req: Request , res: Response, next: NextFunction): Promise<void> {
    try {
      this.success(res, 'user updated', false, 201);
    } catch (error) {
      next(error);
    }
  }

}