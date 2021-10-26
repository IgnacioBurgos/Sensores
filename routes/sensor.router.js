const express = require('express');

const SensorService = require('../services/sensor.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createSensorSchema , updateSensorSchema, getSensorSchema } = require('./../schemas/sensor.schema');

const router = express.Router();
const service = new SensorService();

router.get('/',
  async (req, res, next) => {
  try {
    const sensor = await service.find();
    res.json(sensor);
  } catch (error) {
    next(error);
  }
});


router.get('/:id',
  validatorHandler(getSensorSchema , 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sensor = await service.findOne(id);
      res.json(sensor);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createSensorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSensor = await service.create(body);
      res.status(201).json(newSensor);
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:id',
  validatorHandler(getSensorSchema, 'params'),
  validatorHandler(updateSensorSchema, 'body'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const sensor = await service.update(id, body);
      res.json(sensor);
    } catch (error){
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getSensorSchema, 'params'),
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

module.exports = router;
