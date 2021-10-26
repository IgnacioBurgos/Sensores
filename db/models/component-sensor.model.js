const { Model, DataTypes } = require('sequelize');


const { COMPONENT_TABLE } = require('./component.model');
const { SENSOR_TABLE } = require('./sensor.model');

const COMPONENT_SENSOR_TABLE = 'components_sensors';

const ComponentSensorSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  componentId: {
    field: 'component_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPONENT_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',
    //onDelete: 'SET NULL'
  },
  sensorId: {
    field: 'sensor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SENSOR_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',
    //onDelete: 'SET NULL'
  },
}

class ComponentSensor extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPONENT_SENSOR_TABLE,
      modelName: 'ComponentSensor',
      timestamps: false
    }
  }
}


module.exports = { ComponentSensor, ComponentSensorSchema, COMPONENT_SENSOR_TABLE };
