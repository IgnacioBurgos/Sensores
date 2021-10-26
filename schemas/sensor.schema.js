const Joi = require('joi');

const id = Joi.number().integer();
const nombreGrafica = Joi.string().min(3).max(10);
const valorMaximo = Joi.number().integer();
const valorMinimo = Joi.number().integer();
const tipoSensor = Joi.string().min(3).max(20);
const unidadSensor = Joi.string().min(3).max(20);


const createSensorSchema = Joi.object({
  nombreGrafica: nombreGrafica,
  valorMaximo: valorMaximo,
  valorMinimo: valorMinimo,
  tipoSensor: tipoSensor,
  unidadSensor: unidadSensor

});

const updateSensorSchema = Joi.object({
  nombreGrafica: nombreGrafica,
  valorMaximo: valorMaximo,
  valorMinimo: valorMinimo,
  tipoSensor: tipoSensor,
  unidadSensor: unidadSensor
});

const getSensorSchema = Joi.object({
  id: id,
});

module.exports = { createSensorSchema, updateSensorSchema, getSensorSchema }
