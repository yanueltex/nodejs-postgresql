const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

// Empezar a definir los nombres de las tablas
const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createAt: {
    //Como queremos manipularlo en JS (CamelCase)
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', //Como queremos que quede en la base de datos
    defaultValue: Sequelize.NOW,
  },
  // Se crea un ESQUEMA para el campo de asociación con la categoría
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      // Referencia 1 a muchos
      model: CATEGORY_TABLE, // A la tabla Categoría
      key: 'id', // Referente a su ID
    },
    // Reglas al actualizar
    onUpdate: 'CASCADE', // Comportamiento en cascada
    // Reglas al borrar
    onDelete: 'SET NULL', // Setea a NULL
  },
};

class Product extends Model {
  static associate(models) {
    // Un producto pertenece a una categoría
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
