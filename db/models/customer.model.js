const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model'); // Reutilizamos el nombre de la tabla

// Empezar a definir los nombres de las tablas
const CUSTOMER_TABLE = 'customers';

// Definimos la estructura
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    //Como queremos manipularlo en JS (CamelCase)
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', //Como queremos que quede en la base de datos
    defaultValue: Sequelize.NOW,
  },

  // Se crea un ESQUEMA para el campo de asociación con el usuario
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      // Referencia 1 a 1
      model: USER_TABLE, // A la tabla user
      key: 'id', // Referente a su ID usuario
    },
    // Reglas al actualizar
    onUpdate: 'CASCADE', // Comportamiento en cascada
    // Reglas al borrar
    onDelete: 'SET NULL', // Setea a NULL
  },
};

class Customer extends Model {
  static associate(models) {
    // Relacion 1 a 1 (Customer tiene un usuario)
    // Entonces la relación viene del lado de Customers así:
    this.belongsTo(models.User, { as: 'user' }); // Le ponemos el alias 'user'
    // Desde aquí toca preguntar, ¿Los customers cuáles Ordenes tiene? Bueno...
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
