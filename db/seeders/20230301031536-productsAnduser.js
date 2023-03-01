'use strict';

const bcrypt = require('bcrypt');
const config = require('../../config');
const { PRODUCT_TABLE } = require('../models/productModel')
const { USER_TABLE } = require('../models/userModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //eslint-disable-line

    const products = [
      {code: 'PANTS', name: 'Pants', price: '5.00'},
      {code: 'TSHIRT', name: 'T-Shirt', price: '20.00'},
      {code: 'HAT', name: 'Hat', price: '7.50'}
    ];

    const password = await bcrypt.hash(config.suPassword, 10);

    const users = [
      { email: 'user@mail.com', username: 'sample-user',  password, rol: 2}
    ];

    await queryInterface.bulkInsert(PRODUCT_TABLE, products, {});
    await queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down (queryInterface, Sequelize) { //eslint-disable-line
    await queryInterface.bulkDelete(PRODUCT_TABLE)
    await queryInterface.bulkDelete(USER_TABLE)
  }
};