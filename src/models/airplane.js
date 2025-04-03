'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9\s]+$/ // Allows letters, numbers, and spaces
      }
    },
    
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 1000 // Ensure this value matches your requirements
      }
    },
    
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};