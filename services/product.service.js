const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize'); // Sequelize tiene operadores para filtrar por rango
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    // Filtrar por rango de Precio
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        // Ésta vez se tiene que enviar un objeto
        [Op.gte]: price_min, // Op.gte es para mayor o igual a >=
        [Op.lte]: price_max, // Op.let es para menor o igual a <=
      };
    }
    const product = await models.Product.findAll(options);
    return product;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
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

module.exports = ProductsService;
