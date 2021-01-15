/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const supertest = require('__tests__');

const testServer = (router, controller) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  router(app, controller);
  return supertest(app);
};

module.exports = testServer;
