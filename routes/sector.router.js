const express = require('express');
const passport = require('passport');

const SectorService = require('../services/sector.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createSectorSchema , updateSectorSchema, getSectorSchema } = require('./../schemas/sector.schema');

const router = express.Router();
const service = new SectorService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const sectors = await service.find();
    res.json(sectors);
  } catch (error) {
    next(error);
  }
});



router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createSectorSchema, 'body'),
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
router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getSectorSchema, 'params'),
  validatorHandler(updateSectorSchema, 'body'),
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
  validatorHandler(getSectorSchema, 'params'),
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
