'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place_living = sequelize.define('Place_living', {
    country: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING,
    living_time: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    }
  }, {
      tableName: "places_living",
      name: {
        plural: "Places_living"
      }

    });
  Place_living.associate = function (models) {
    // associations can be defined here
  };
  return Place_living;
};