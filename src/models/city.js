'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      this.hasMany(models.Airport, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
      });
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: {
            msg: 'City name must contain only letters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'City', // Capitalized
    }
  );

  return City;
};
