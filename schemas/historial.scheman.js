const Joi = require('joi');

const nombreSensor = Joi.string().min(3).max(20);
const temperatura = Joi.number();
const humedad = Joi.number();
const peso = Joi.number();
const humedadRelativa = Joi.number();
const direccionViento = Joi.number();
const luminosidad = Joi.number();
const temperaturaInfrarroja = Joi.number();
const valorOtroSensor = Joi.number();

const createHistorialSchema = Joi.object({
  nombreSensor: nombreSensor.required(),
  temperatura: temperatura,
  humedad: humedad,
  peso: peso,
  humedadRelativa: humedadRelativa,
  direccionViento: direccionViento,
  luminosidad: luminosidad,
  temperaturaInfrarroja: temperaturaInfrarroja,
  valorOtroSensor: valorOtroSensor
});

const updateHistorialSchema = Joi.object({
  nombreSensor: nombreSensor.required(),
  temperatura: temperatura,
  humedad: humedad,
  peso: peso,
  humedadRelativa: humedadRelativa,
  direccionViento: direccionViento,
  luminosidad: luminosidad,
  temperaturaInfrarroja: temperaturaInfrarroja,
  valorOtroSensor: valorOtroSensor
});

const getHistorialSchema = Joi.object({
  nombreSensor: nombreSensor,
});

module.exports = { createHistorialSchema , updateHistorialSchema, getHistorialSchema }
