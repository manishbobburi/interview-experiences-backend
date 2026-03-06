'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // 2 Map existing roles
    await queryInterface.sequelize.query(`
      UPDATE Users u
      JOIN Roles r 
      ON (
        (u.role = 'viewer' AND r.name = 'USER') OR
        (u.role = 'poster' AND r.name = 'ADMIN')
      )
      SET u.roleId = r.id
    `);

    // 3 Remove ENUM column
    await queryInterface.removeColumn("Users", "role");

    // 4 Add FK constraint
    await queryInterface.addConstraint("Users", {
      fields: ["roleId"],
      type: "foreign key",
      name: "fk_users_role",
      references: {
        table: "Roles",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Users", "fk_users_role");
    await queryInterface.removeColumn("Users", "roleId");
  },
};
