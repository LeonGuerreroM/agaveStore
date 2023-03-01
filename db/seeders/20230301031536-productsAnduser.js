'use strict';

const bcrypt = require('bcrypt');
const config = require('../../config');
const { PRODUCT_TABLE } = require('../models/productModel');
const { USER_TABLE } = require('../models/userModel');
const { SALE_TABLE } = require('../models/saleModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //eslint-disable-line

    const date = new Date();

    const sales = [
      {id: 1, name: 'no sale', description: 'no sale', created_at: date},
      {id: 2, name: '2-for-1', description: 'Buy one and get another free', created_at: date},
      {id: 3, name: 'Bulk', description: 'get a 5% discount when buying 3 or more', created_at: date},
    ];

    const products = [
      {code: 'PANTS', name: 'Pants', price: '5.00', sale_id: 2},
      {code: 'TSHIRT', name: 'T-Shirt', price: '20.00', sale_id: 3},
      {code: 'HAT', name: 'Hat', price: '7.50', sale_id: 1}
    ];

    const password = await bcrypt.hash(config.suPassword, 10);

    const users = [
      { email: 'user@mail.com', username: 'sample-user',  password, rol: 2}
    ];

    await queryInterface.bulkInsert(SALE_TABLE, sales, {});
    await queryInterface.bulkInsert(PRODUCT_TABLE, products, {});
    await queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down (queryInterface, Sequelize) { //eslint-disable-line
    await queryInterface.bulkDelete(SALE_TABLE)
    await queryInterface.bulkDelete(PRODUCT_TABLE)
    await queryInterface.bulkDelete(USER_TABLE)
  }
};