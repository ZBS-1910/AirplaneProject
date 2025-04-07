'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'city_fkey_constraint');
    await queryInterface.addConstraint('Airports', {
      fields: ['cityID'],
      type: 'foreign key',
      name: 'city_fkey_constraint', // same name
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // logic to revert if needed
  }
};
