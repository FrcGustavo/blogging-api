import { Application } from 'express';

import API_REST_V2 from '../components/apiRestV2';
import POLLS_APP from '../components/polls-app';

const ROUTER = (app: Application): void => {
  API_REST_V2(app);
  POLLS_APP(app);
};

export default ROUTER;
