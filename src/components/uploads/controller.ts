import { Request, Response, NextFunction } from 'express';

export default class Uploads {

  private service: any;
  private success: any;

  constructor(service: any, success: any) {
    this.service = service;
    this.success = success;

    this.upload = this.upload.bind(this);
    this.show = this.show.bind(this);
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

  async show (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const pathFile = await this.service.findFile(id);
      res.status(200).sendFile(pathFile);
    } catch (error) {
      next(error);
    }
  };
}