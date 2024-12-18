const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

// Empezar a definir los nombres de las tablas
const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      // Referencia 1 a muchos
      model: CUSTOMER_TABLE, // A la tabla Customers
      key: 'id', // Referente a su ID
    },
    // Reglas al actualizar
    onUpdate: 'CASCADE', // Comportamiento en cascada
    // Reglas al borrar
    onDelete: 'SET NULL', // Setea a NULL
  },
  createAt: {
    //Como queremos manipularlo en JS (CamelCase)
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', //Como queremos que quede en la base de datos
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL, // Para que Sequelize sepa que éste no es un campo de la tabla
    get() {
      if (this.items && this.items.length > 0) {
        // items es la manera que llamamos la sesion, busca abajo...
        return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0); //Que inicie en 0
      }
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    // Una order pertenezca a varios clientes
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    // Aqui se hace la relación muchos a muchos
    this.belongsToMany(models.Product, {
      as: 'items', // La orden tiene varios items de compras y se va a resolver...
      through: models.OrderProduct, // A traves de la tabla OrderProduct...
      foreignKey: 'orderId', // Y la llave por la cual estoy resolviendo la relacion es de la tabla Order...
      otherKey: 'productId', // La otra llave donde traigo los productos
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
