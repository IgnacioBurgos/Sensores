
const { Model, DataTypes } = require('sequelize');

const HISTORIAL_TABLE = 'historials';

const HistorialSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombreSensor: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_sensor',
  },
  temperatura: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  humedad: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  peso: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  humedadRelativa: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'humedadad_relativa',
  },
  direccionViento: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'dirección_viento',
  },
  luminosidad: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  temperaturaInfrarroja: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  valorOtroSensor:{
    allowNull: true,
    type: DataTypes.INTEGER || DataTypes.DOUBLE,
  }
}

class Historial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HISTORIAL_TABLE,
      modelName: 'Historial',
      timestamps: false
    }
  }
}


module.exports = { Historial, HistorialSchema, HISTORIAL_TABLE };
