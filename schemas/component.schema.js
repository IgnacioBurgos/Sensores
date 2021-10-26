const Joi = require('joi');

const id = Joi.number().integer();
const nombre_componente = Joi.string().min(3).max(10);
const tipo_cultivo = Joi.string().min(3).max(20);
const user_id = Joi.number().integer();
const sector_id = Joi.number().integer();
const component_id = Joi.number().integer();
const sensor_id = Joi.number().integer();
const historial_id = Joi.number().integer();
const email = Joi.string();
const nombre_sector = Joi.string();

const createComponentSchema = Joi.object({
  nombreComponente: nombre_componente.required(),
  tipoCultivo: tipo_cultivo.required(),
  userId: user_id,
  sectorId: sector_id,
  email: email.required(),
  sector: nombre_sector.required()
});

const updateComponentSchema = Joi.object({
  nombreComponente: nombre_componente,
  tipoCultivo: tipo_cultivo,
});

const getComponentSchema = Joi.object({
  id: id.required(),
});

const addSensorSchema = Joi.object({
  componentId: component_id,
  sensorId: sensor_id,
});

const addHistorialSchema = Joi.object({
  componentId: component_id,
  historialId: historial_id,
});



module.exports = { createComponentSchema, updateComponentSchema, getComponentSchema, addSensorSchema, addHistorialSchema }
