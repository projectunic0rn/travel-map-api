'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place_living = sequelize.define('Place_living', {
    country: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    countryISO: {
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
    cityId: {
      type: DataTypes.INTEGER
    },
    city_latitude: {
      type: DataTypes.INTEGER
    },
    city_longitude: {
      type: DataTypes.INTEGER
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
    Place_living.belongsTo(models.User)
  };
  return Place_living;
};
