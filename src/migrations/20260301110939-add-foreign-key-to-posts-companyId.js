'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint("Posts", {
    fields: ["companyId"],
    type: "foreign key",
    name: "posts_company_fk",
    references: {
      table: "Companies",
      field: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
