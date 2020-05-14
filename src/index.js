const express = require('express');

const ROUTER = require('./router');

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

ROUTER(app);

module.exports = app;
