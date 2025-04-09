'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Airports', [
      {
        name: 'Kempegowda International Airport',
        code: 'BLR',
        address: 'Devanahalli, Bengaluru, Karnataka',
        cityID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chhatrapati Shivaji Maharaj International Airport',
        code: 'BOM',
        address: 'Andheri, Mumbai, Maharashtra',
        cityID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Indira Gandhi International Airport',
        code: 'DEL',
        address: 'Palam, New Delhi',
        cityID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rajiv Gandhi International Airport',
        code: 'HYD',
        address: 'Shamshabad, Hyderabad, Telangana',
        cityID: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Netaji Subhas Chandra Bose International Airport',
        code: 'CCU',
        address: 'Dum Dum, Kolkata, West Bengal',
        cityID: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Airports', null, {});
  }
};
