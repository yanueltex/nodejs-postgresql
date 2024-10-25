// Los MODELOS
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize) {
  // Inicialización de los MODELOS
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  // Ejecutamos la asociacion 1 a 1 aquí (Customer tiene un usuario)
  User.associate(sequelize.models);
  // La relación está creada dentro de customers.model.js
  Customer.associate(sequelize.models);
  // La relación uno a muchos de Categoría a productos
  Category.associate(sequelize.models);
  // La relación 1 a 1 de productos un su categoría
  Product.associate(sequelize.models);
  // LA relación uno a muchos de ordenes a customers
  Order.associate(sequelize.models);

  /*ATENCIÓN: Como OrderProduct es una tabla terniaria de asociación Muchos a Muchos
  entonces el modelo Order me va a resolver los items a traves de OrderProduct.
  Ésa resolución está en "order.model.js" dentro de la asociación*/
}

module.exports = setupModels;
