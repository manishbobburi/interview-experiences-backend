'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'company');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'company', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
