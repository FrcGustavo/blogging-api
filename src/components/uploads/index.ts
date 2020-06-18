import { Router } from 'express';
import multer from 'multer';

import success from '../../router/success';
import UploadsService  from './service';
import Uploads from './controller';
import UploadsRouter from './router';

function UPLOADS(app: any): void {
  const upload = multer({ dest: 'uploads/' });
  const service = new UploadsService();
  const controller = new Uploads(service, success);
  const router = new UploadsRouter(
    app,
    Router(),
    '/api/uploads',
    controller,
    { upload },
  );
  router.setupRouter();
  router.loadRoutes();
};

export default UPLOADS;