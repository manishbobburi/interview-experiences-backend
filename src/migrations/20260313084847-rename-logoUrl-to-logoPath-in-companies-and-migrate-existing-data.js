'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.renameColumn(
      'Companies', 
      'logoUrl', 
      'logoPath'
    );

    await queryInterface.sequelize.query(`
      UPDATE Companies
      SET logoPath = CONCAT('logos/', SUBSTRING_INDEX(logoPath, '/', -1))
    `);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.renameColumn(
      'Companies',
      'logoPath',
      'logoUrl'
    );
  }
};
