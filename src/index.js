const path = require('path');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');

const { info } = require('./utils/debug');
const config = require('./config');
const ROUTER = require('./router');

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

module.exports = app;
