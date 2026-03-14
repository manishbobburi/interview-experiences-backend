'use strict';

const slugify = require("slugify");
const { nanoid } = require("nanoid");
const { query } = require("express-validator");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Posts', 'slug', {
    type: Sequelize.STRING,
    allowNull: true,
   });

   const posts = await queryInterface.sequelize.query(
    `
    SELECT p.id, p.role, c.name as companyName
    FROM Posts p
    JOIN Companies c ON p.companyId = c.id
    `,
    { type: Sequelize.QueryTypes.SELECT }
   );

   for(const post of posts) {
    const base = `${post.companyName} ${post.role} interview experience`;

    const slugBase = slugify(base, {
      lower: true,
      strict: true
    });

    const slug = `${slugBase}-${nanoid(8)}`;

    await queryInterface.sequelize.query(
      `UPDATE Posts SET slug = :slug WHERE id = :id`,
      {
        replacements: {
          slug,
          id: post.id
        }
      }
    );
   }

   await queryInterface.changeColumn('Posts', 'slug', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'slug');
  }
};
