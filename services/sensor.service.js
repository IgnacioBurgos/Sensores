const { models }= require('./../libs/sequelize');

class SensorService {

  constructor(){}

  async create(data) {
    const newSensor = await models.Sensor.create(data);
    return newSensor;
  }

  async find() {
    const rta = await models.Sensor.findAll();
    return rta;
  }

  async findOne(id) {
    const sensor = await models.Sensor.findByPk(id);
    return sensor;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = SensorService;
