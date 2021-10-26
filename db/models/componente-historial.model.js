const { Model, DataTypes } = require('sequelize');

const { HISTORIAL_TABLE } = require('./historial.model');
const { COMPONENT_TABLE } = require('./component.model');

const COMPONENT_HISTORIAL_TABLE = 'components_historials';

const ComponentHistorialSchema = {

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
  historialId: {
    field: 'sensor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: HISTORIAL_TABLE,
      key: 'id'
    },
    //onUpdate: 'CASCADE',
    //onDelete: 'SET NULL'
  },
}

class ComponentHistorial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPONENT_HISTORIAL_TABLE,
      modelName: 'ComponentHistorial',
      timestamps: false
    }
  }
}


module.exports = { ComponentHistorial, ComponentHistorialSchema, COMPONENT_HISTORIAL_TABLE };
