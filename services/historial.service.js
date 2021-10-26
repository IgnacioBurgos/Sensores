const { models }= require('./../libs/sequelize');

class HistorialService {

  constructor(){}

  async create(data) {
    const newHistorial = await models.Historial.create(data);
    return newHistorial;
  }

  async find() {
    const rta = await models.Historial.findAll();
    return rta;
  }

  async findOne(id) {
    const sensor = await models.Historial.findByPk(id);
    return sensor;
  }

}

module.exports = HistorialService;
