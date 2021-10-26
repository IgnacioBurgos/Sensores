const { models }= require('./../libs/sequelize');
const boom = require('@hapi/boom');

class SectorService {

  constructor(){}

  async create(data) {
    const newSector = await models.Sector.create(data);
    return newSector;
  }

  async find() {
    const rta = await models.Sector.findAll();
    return rta;
  }

  async findSector(nombreSector) {
    const rta = await models.Sector.findOne({
      where: { nombreSector }
    });
    return rta;
  }

  async findOne(id) {
    const sector = await models.Sector.findByPk(id);
    if (!sector) {
      throw boom.notFound('sector not found');
    }
    return sector;
  }

  async update(id, changes) {
    const sector = await models.Sector.findByPk(id);
    const rta = await sector.update(changes);
    return rta;
  }

  async delete(id) {
    return { id };
  }

}

module.exports = SectorService;
