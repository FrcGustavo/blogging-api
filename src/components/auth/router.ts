import { Application, Router } from 'express';

export default class AuthRouter {
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
    this.router.post('/register', this.controller.create);
    this.router.post('/login', this.controller.login);
  }
}