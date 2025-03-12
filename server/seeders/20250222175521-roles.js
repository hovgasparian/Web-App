'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = [
      { name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Customer', createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('roles', roles);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
