import { Application } from 'express';

import API_REST_V1 from '../components/apiRestV1';

const ROUTER = (app: Application): void => {
  API_REST_V1(app);
};

export default ROUTER;
