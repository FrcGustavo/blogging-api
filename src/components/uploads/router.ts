import { Application, Router } from "express";

export default class UploadsRouter {

  private app: Application
  private router: Router
  private path: string
  private controller: any
  private middlewares: object

  constructor(
    app: Application,
    router: Router,
    path: string,
    controller: any,
    middlewares: object
  ) {
    this.app = app;
    this.router = router;
    this.path = path;
    this.controller = controller;
    this.middlewares = middlewares;
  }

  setupRouter(): void {
    this.app.use(this. path, this.router);
  }

  loadRoutes(): void {
    this.router.post(
      '/', 
      (this.middlewares as any).upload.single('cover'),
      this.controller.upload,
    );
  }
} 