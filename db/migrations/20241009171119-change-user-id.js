'use strict';

const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      // No se toma la referencia del Schema porque ya está construido en las restricciones de la tabla
      // Ese solo se hace al crearla, no al querer modificar un campo de la tabla
    });
  },

  async down(queryInterface) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
