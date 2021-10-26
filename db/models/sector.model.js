const { Model, DataTypes } = require('sequelize');

const SECTOR_TABLE = 'sectors';

const SectorSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombreSector: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_sector',
    unique: true,
  }
}

class Sector extends Model {
  static associate(models) {
    this.hasMany(models.Component, {
      as: 'components',
      foreignKey: 'sectorId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SECTOR_TABLE,
      modelName: 'Sector',
      timestamps: false
    }
  }
}


module.exports = { Sector, SectorSchema, SECTOR_TABLE };
