const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const componentRouter = require('./component.router');
const sectorRouter = require('./sector.router');
const sensorRouter = require('./sensor.router');
const profileRouter= require('./profile.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/component',componentRouter);
  router.use('/sector', sectorRouter);
  router.use('/sensor', sensorRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
