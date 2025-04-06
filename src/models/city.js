'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    static associate(models) {
      // define association here
    }
  }

  city.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: {
          msg: 'City name must contain only letters'
        },
              
      }
    }
  }, {
    sequelize,
    modelName: 'city',
  });

  return city;
};
