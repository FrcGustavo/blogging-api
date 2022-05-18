import { Application } from 'express';

import API_REST_V2 from '../components/apiRestV2';

const ROUTER = (app: Application): void => {
  API_REST_V2(app);
};

export default ROUTER;
