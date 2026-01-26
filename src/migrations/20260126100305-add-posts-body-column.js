'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Posts', 'body', {
    type: Sequelize.TEXT
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'body');
  }
};
