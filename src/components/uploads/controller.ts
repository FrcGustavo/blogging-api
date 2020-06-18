import { Request, Response, NextFunction } from "express";

export default class Uploads {

  private service: any;
  private success: any;

  constructor(service: any, success: any) {
    this.service = service;
    this.success = success;
  }

  async upload(req: Request, res: Response, next: NextFunction) {
    const { files } = req as any;
    try {
      const uploadedFile = await this.service.uploadFile(files);
      this.success(res, 'file uploaded', uploadedFile, 201);
    } catch (error) {
      next(error);
    }
  }
}