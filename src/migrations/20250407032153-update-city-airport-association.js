'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.addConstraint('Airports',{
      type:'FOREIGN KEY',
      fields:['cityID'],
      name:'city_fkey_constraint',
      references:{
        table:'cities',
        field:'id',



      },
      onUpdate:'CASCADE',

    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.addConstraint( 'Airports', 'city_fkey_constraint');
  }
};
