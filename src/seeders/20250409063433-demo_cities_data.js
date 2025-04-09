'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', [
      {
        name: 'Bangalore',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mumbai',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delhi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hyderabad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
