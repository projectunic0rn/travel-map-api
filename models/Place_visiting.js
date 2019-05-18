'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place_visiting = sequelize.define('Place_visiting', {
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
    arriving_date: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    },
    departing_date: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    }
  }, {
      tableName: "places_visiting",
      name: {
        singular: 'Place_visiting',
        plural: 'Places_visiting'
      }
    });
  Place_visiting.associate = function (models) {
    Place_visiting.belongsTo(models.User)
    // associations can be defined here
  };
  return Place_visiting;
};