const express = require('express');

const HistorialService = require('../services/historial.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createHistorialSchema , updateHistorialSchema, getHistorialSchema } = require('./../schemas/historial.scheman');

const router = express.Router();
const service = new HistorialService();

router.get('/',
  async (req, res, next) => {
  try {
    const historial = await service.find();
    res.json(historial);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getHistorialSchema , 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const historial = await service.findOne(id);
      res.json(historial);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createHistorialSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newHistorial= await service.create(body);
      res.status(201).json(newHistorial);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getHistorialSchema, 'params'),
  validatorHandler(updateHistorialSchema, 'body'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const historial = await service.update(id, body);
      res.json(historial);
    } catch (error){
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getHistorialSchema, 'params'),
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
