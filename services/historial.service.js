const { models }= require('./../libs/sequelize');

class HistorialService {

  constructor(){}

  async find(nombreSensor) {
    const rta = await models.Historial.findAll({
      where: {
        nombreSensor,
      }
    });
    return rta;
  }
}

module.exports = HistorialService;
