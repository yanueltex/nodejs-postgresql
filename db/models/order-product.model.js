const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model'); // Reutilizamos el nombre de la tabla
const { PRODUCT_TABLE } = require('./product.model'); // Reutilizamos el nombre de la tabla

// Empezar a definir los nombres de las tablas
const ORDER_PRODUCT_TABLE = 'orders_products';

// Definimos la estructura
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createAt: {
    //Como queremos manipularlo en JS (CamelCase)
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', //Como queremos que quede en la base de datos
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  // Se crea un ESQUEMA para el campo de asociación con la orden
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      // Referencia 1 a 1
      model: ORDER_TABLE, // A la tabla user
      key: 'id', // Referente a su ID usuario
    },
    // Reglas al actualizar
    onUpdate: 'CASCADE', // Comportamiento en cascada
    // Reglas al borrar
    onDelete: 'SET NULL', // Setea a NULL
  },
  // Se crea un ESQUEMA para el campo de asociación con el producto
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      // Referencia 1 a 1
      model: PRODUCT_TABLE, // A la tabla user
      key: 'id', // Referente a su ID usuario
    },
    // Reglas al actualizar
    onUpdate: 'CASCADE', // Comportamiento en cascada
    // Reglas al borrar
    onDelete: 'SET NULL', // Setea a NULL
  },
};

class OrderProduct extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
