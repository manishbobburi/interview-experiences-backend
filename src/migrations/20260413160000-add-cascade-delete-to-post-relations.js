'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 0. Safely remove constraints if they partially exist so this script is fully idempotent
    try { await queryInterface.removeConstraint('Comments', 'fk_comments_postId'); } catch (e) {}
    try { await queryInterface.removeConstraint('Votes', 'fk_votes_postId'); } catch (e) {}
    
    // 1. Clean up orphaned records
    await queryInterface.sequelize.query(
      `DELETE FROM Comments WHERE postId NOT IN (SELECT id FROM Posts)`
    );
    await queryInterface.sequelize.query(
      `DELETE FROM Votes WHERE postId NOT IN (SELECT id FROM Posts)`
    );

    // Add foreign key constraint to Comments table
    await queryInterface.addConstraint('Comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_comments_postId',
      references: {
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign key constraint to Votes table
    await queryInterface.addConstraint('Votes', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_votes_postId',
      references: {
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the foreign key constraints if rolled back
    await queryInterface.removeConstraint('Comments', 'fk_comments_postId');
    await queryInterface.removeConstraint('Votes', 'fk_votes_postId');
  }
};
