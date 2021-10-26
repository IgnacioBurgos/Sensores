const { User, UserSchema } = require('./user.model');
const { Component, ComponentSchema } = require('./component.model');
const { Sector, SectorSchema } = require('./sector.model');
const { Sensor, SensorSchema } = require('./sensor.model');
const { ComponentSensor, ComponentSensorSchema } = require('./component-sensor.model');
const { Historial, HistorialSchema } = require('./historial.model');
const { ComponentHistorial, ComponentHistorialSchema } = require('./componente-historial.model');

function setupModels(sequelize) {

  User.init(UserSchema, User.config(sequelize));
  Component.init(ComponentSchema, Component.config(sequelize));
  Sector.init(SectorSchema, Sector.config(sequelize));
  Sensor.init(SensorSchema, Sensor.config(sequelize));
  ComponentSensor.init(ComponentSensorSchema, ComponentSensor.config(sequelize));
  Historial.init(HistorialSchema, Historial.config(sequelize));
  ComponentHistorial.init(ComponentHistorialSchema, ComponentHistorial.config(sequelize));

  User.associate(sequelize.models);
  Sector.associate(sequelize.models);
  Component.assocciate(sequelize.models);
  Sensor.associate(sequelize.models);
  Historial.associate(sequelize.models);
}

module.exports = setupModels;
