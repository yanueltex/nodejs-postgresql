const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      // Asociación para que Customer cree de una vez el usuario
      include: ['user'],
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      // Se usa el ALIAS que creamos en customer.model.js
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }
}

module.exports = CustomerService;
