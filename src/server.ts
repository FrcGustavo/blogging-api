import http from 'http';

import { app as appDebug } from './utils/debbug';
import config from './config';
import ROUTER from './router';
import Websocket from './websocket';
import App from './app';

const app = new App().getIntance();
const server = http.createServer(app);
new Websocket({ server });

ROUTER(app);

server.listen(config.srv.port, () => {
  appDebug(`Server is running ${config.srv.port}`);
});
