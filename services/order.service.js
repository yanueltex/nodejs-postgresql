const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      // Anidamiento de asociaciones
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items', // Se agrega los items de la asociacion muchos a muchos de "order.model.js"
      ],
    });
    return order;
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

module.exports = OrderService;
