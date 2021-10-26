const { Model, DataTypes } = require('sequelize');

const SENSOR_TABLE = 'sensors';

const SensorSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombreGrafica: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_grafica',
  },
  valorMaximo: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'valor_máximo',
  },
  valorMinimo: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'valor_mínimo',
  },
  tipoSensor: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'tipo_sensor',
  },
  unidadSensor: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'unidad_sensor',
  }
}

class Sensor extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SENSOR_TABLE,
      modelName: 'Sensor',
      timestamps: false
    }
  }
}


module.exports = { Sensor, SensorSchema, SENSOR_TABLE };
