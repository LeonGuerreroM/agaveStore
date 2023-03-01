'use strict';

const { PRODUCT_TABLE } = require('../models/productModel');
const { USER_TABLE } = require('../models/userModel');
const { SALE_TABLE } = require('../models/saleModel');
const { DataTypes, Sequelize } = require('sequelize');

module.exports = {

  up: async (queryInterface) => {
    
    await queryInterface.createTable(SALE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING
      },
      description: {
          allowNull: false,
          type: DataTypes.STRING
      },
      createdAt: {
          allowNull: false,
          field: 'created_at',
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
      }
    });

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
      },
      saleId: {
          allowNull: false,
          field: 'sale_id',
          type: DataTypes.INTEGER,
          defaultValue: 0,
          references: {
              model: SALE_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
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
    await queryInterface.dropTable(SALE_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }

};
