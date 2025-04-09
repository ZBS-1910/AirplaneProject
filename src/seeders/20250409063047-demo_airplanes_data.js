'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'Boeing 747',
        capacity: 416,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Airbus A380',
        capacity: 853,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Lockheed C-130 Hercules',
        capacity: 92_000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'F-22 Raptor',
        capacity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Antonov An-225 Mriya',
        capacity: 250_000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Airplanes', null, {});
  }
};
