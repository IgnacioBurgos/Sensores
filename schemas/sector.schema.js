const Joi = require('joi');

const id = Joi.number().integer();
const nombreSector = Joi.string().min(3).max(10);

const createSectorSchema = Joi.object({
  nombreSector: nombreSector.required(),

});

const updateSectorSchema = Joi.object({
  nombreSector: nombreSector,
});

const getSectorSchema = Joi.object({
  id: id,
});

module.exports = { createSectorSchema, updateSectorSchema, getSectorSchema }
