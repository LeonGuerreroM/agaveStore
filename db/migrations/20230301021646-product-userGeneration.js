'use strict';

const { PRODUCT_TABLE } = require('../models/productModel');
const { USER_TABLE } = require('../models/userModel');
const { DataTypes } = require('sequelize');

module.exports = {

  up: async (queryInterface) => {
    
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      code: {
          allowNull: false,
          type: DataTypes.STRING
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING
      },
      price: {
          allowNull: false,
          type: DataTypes.FLOAT
      }
    });

    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING
      },
      username: {
          allowNull: false,
          type: DataTypes.STRING
      },
      password: {
          allowNull: false,
          type: DataTypes.STRING
      },
      rol: {
          allowNull: false,
          type: DataTypes.INTEGER
      }
    });

  },


  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }

};
