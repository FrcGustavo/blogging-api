import path from 'path';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { info } from './utils/debug';
import ROUTER from './router';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev', { stream: { write: (msg) => info(msg) } }));

ROUTER(app);

export default app;
