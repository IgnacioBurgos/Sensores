const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const ComponentService = require('../services/component.service');

const router = express.Router();
const service = new ComponentService();


router.get('/my-components/:sectorId',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','customer'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { sectorId } = req.params;
      const components = await service.myComponentsUser(user.sub, sectorId);
      res.json(components);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/my-sectors',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','customer'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const components = await service.mySectorsUser(user.sub);
      res.json(components);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/my-graphics/:nombreSensor',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { nombreSensor } = req.params;
      const components = await service.myGraphicsUser(user.sub, nombreSensor);
      res.json(components);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/my-historial/:nombreSensor',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','customer'),
  async (req, res, next) => {
    try {
      const { nombreSensor } = req.params;
      const components = await service.myHistorialUser(nombreSensor);
      res.json(components);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
