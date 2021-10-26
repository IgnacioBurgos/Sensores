const { models }= require('../libs/sequelize');
const boom = require('@hapi/boom');

const UserService = require('./user.service');
const service = new UserService();

const SectorService = require('./sector.service');
const service1 = new SectorService();

class ComponentService {

  constructor(){}

  async myComponentsUser(userId, sectorId){
    const components = await models.Component.findAll({
    where: {
        userId: userId,
        sectorId: sectorId
    },
    attributes: ['nombreComponente', 'tipoCultivo'],
    });
    return components;
  }

  async mySectorsUser(userId){
    const components = await models.Component.findAll({
      where: {
        userId: userId
      },
      attributes: ['sectorId'],
      group: ['sectorId'],
      include: [
        {
          association: 'sector',
          attributes: ['nombreSector'],
        },
      ]
    });
    return components;
  }

  async myGraphicsUser(userId,nombreSensor){
    const components = await models.Component.findAll({
      where: {
        userId: userId,
        nombreComponente: nombreSensor
      },
      attributes: [],
      include: [
        {
          association: 'items',
          attributes: ['nombreGrafica', 'valorMaximo','valorMinimo',
          'tipoSensor','unidadSensor']
        }
      ]
    });
    return components;
  }

  async myHistorialUser(userId, nombreSensor){
    const components = await models.Component.findAll({
      where: {
        userId: userId,
        nombreComponente: nombreSensor
      },
      attributes: [],
      include: [
        {
          association: 'items-historial',
        }
      ]
    });
    return components;
  }

  async addSensorItem(data) {
    const newSensorItem = await models.ComponentSensor.create(data);
    return newSensorItem;
  }

  async addHistorialItem(data) {
    const newHistorialItem = await models.ComponentHistorial.create(data);
    return newHistorialItem;
  }

  async create(data) {

    const user = await service.findByEmail(data.email);
    const sector = await service1.findSector(data.sector);

    if (!(user || sector)) {
      throw boom.unauthorized();
    }
    const newComponent = await models.Component.create({
      ...data,
      userId: user.id,
      sectorId: sector.id
    });

    return newComponent;
  }

  async findOne(id) {
    const components = await models.Component.findAll({
      where:{
        sectorId: id
      },
      attributes: ['nombreComponente', 'tipoCultivo']
    });
    return components;
  }

  async find() {
    const rta = await models.Component.findAll({
      attributes:['nombreComponente']
    });
    return rta;
  }

  async update(nombreSensor, changes) {
    const idSensor = await models.Component.findOne({
      where: { nombreComponente: nombreSensor }
    });
    if(!idSensor){
      throw boom.unauthorized();
    }
    const sensor = await models.Component.findByPk(idSensor.id);
    const rta = sensor.update(changes);
    return rta;
  }

  async delete(id) {
    return { id };
  }
}

module.exports = ComponentService;
