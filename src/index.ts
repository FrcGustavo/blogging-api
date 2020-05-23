import path from 'path';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';

import { info } from './utils/debug';
import config from'./config';
import ROUTER from './router';

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.srv.secretSession,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev', { stream: { write: (msg) => info(msg) } }));

ROUTER(app);

export default app;
