const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { SECTOR_TABLE } = require('./sector.model');

const COMPONENT_TABLE = 'components';

const ComponentSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombreComponente: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_componente',
    unique: true,
  },
  tipoCultivo: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'tipo_cultivo',
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',
    //onDelete: 'SET NULL'
  },
  sectorId: {
    field: 'sector_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SECTOR_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',
    //onDelete: 'SET NULL'
  }
}

class Component extends Model {
  static assocciate(models){
    this.belongsTo(models.Sector, {
      as: 'sector'
    });
    this.belongsTo(models.User, {
      as: 'user'
    });
    this.belongsToMany(models.Sensor, {
      as: 'items',
      through: models.ComponentSensor,
      foreignKey: 'componentId',
      otherKey: 'sensorId'
    });
    this.belongsToMany(models.Historial, {
      as: 'items-historial',
      through: models.ComponentHistorial,
      foreignKey: 'componentId',
      otherKey: 'historialId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPONENT_TABLE,
      modelName: 'Component',
      timestamps: false
    }
  }
}


module.exports = { Component, ComponentSchema, COMPONENT_TABLE };
