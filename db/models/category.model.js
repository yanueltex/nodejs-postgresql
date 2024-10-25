const { Model, DataTypes, Sequelize } = require('sequelize');

// Empezar a definir los nombres de las tablas
const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createAt: {
    //Como queremos manipularlo en JS (CamelCase)
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', //Como queremos que quede en la base de datos
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId', // IMPORTANTE: Se coloca el ATRIBUTO de tu MODELO, NO su field
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
