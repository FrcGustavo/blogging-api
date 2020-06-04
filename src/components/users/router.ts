import { Application, Router } from "express";

export default class UsersRouter {

  private app: Application
  private router: Router
  private path: string
  private controller: any

  constructor(app: Application, router: Router, path: string, controller: any) {
    this.app = app;
    this.router = router;
    this.path = path;
    this.controller = controller
  }

  setupRouter(): void {
    this.app.use(this.path, this.router);
  }

  loadRoutes(): void {
    this.router.get('/:id', this.controller.profile);
    this.router.patch('/:id', this.controller.update);
  }
}