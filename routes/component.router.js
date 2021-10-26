const express = require('express');
const passport = require('passport');

const ComponentService = require('../services/component.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createComponentSchema , updateComponentSchema, getComponentSchema, addSensorSchema, addHistorialSchema } = require('./../schemas/component.schema');

const router = express.Router();
const service = new ComponentService();


router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const component = await service.find();
      res.json(component);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getComponentSchema , 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const component = await service.findOne(id);
      res.json(component);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createComponentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newComponent = await service.create(body);
      res.status(201).json(newComponent);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:nombreSensor',
passport.authenticate('jwt', {session: false}),
checkRoles('admin'),
  validatorHandler(updateComponentSchema, 'body'),
  async (req, res, next) => {
    try{
      const { nombreSensor } = req.params;
      const body = req.body;
      const component = await service.update(nombreSensor,body);
      res.json(component);
    } catch (error){
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(addSensorSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error){
      next(error);
    }
  }
);


router.post('/add-sensor',
  validatorHandler(addSensorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSensorItem = await service.addSensorItem(body);
      res.status(201).json(newSensorItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-historial',
  validatorHandler(addHistorialSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newHistorialItem = await service.addHistorialItem(body);
      res.status(201).json(newHistorialItem);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
