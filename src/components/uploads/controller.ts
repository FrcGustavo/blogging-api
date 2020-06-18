import { Request, Response, NextFunction } from "express";

export default class Uploads {

  private service: any;
  private success: any;

  constructor(service: any, success: any) {
    this.service = service;
    this.success = success;

    this.upload = this.upload.bind(this);
  }

  async upload(req: Request, res: Response, next: NextFunction) {
    const { file } = req as any;
    try {
      const uploadedFile = await this.service.uploadFile(file);
      this.success(res, 'file uploaded', uploadedFile, 201);
    } catch (error) {
      next(error);
    }
  }
}