const { Model, DataTypes, Sequelize } = require('sequelize');

// Empezar a definir los nombres de las tablas
const USER_TABLE = 'users';

// Definimos la estructura
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createAt: {
    //Como queremos manipularlo en JS (CamelCase)
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //Como queremos que quede en la base de datos
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    //La relación está del lado del Customer
    this.hasOne(models.Customer, {
      as: 'customer', // alias
      // Cómo la va a encontrar?
      foreignKey: 'userId', // Con el foreing Key de User
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
