

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place_visited = sequelize.define('Place_visited', {
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
      type: DataTypes.STRING
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
    },
    year: {
      type: DataTypes.INTEGER
    },
    days: {
      type: DataTypes.INTEGER
    },
    best_comment: {
      type: DataTypes.STRING,
    },
    hardest_comment: {
      type: DataTypes.STRING,
    },
    trip_purpose: {
      type: DataTypes.STRING
    },
    trip_company: {
      type: DataTypes.STRING
    },
  }, {
      tableName: 'places_visited',
      name: {
        singular: 'Place_visited',
        plural: 'Places_visited'
    }
  });
  Place_visited.associate = function (models) {
    Place_visited.belongsTo(models.User)
    Place_visited.hasMany(models.CityReview)
    Place_visited.hasMany(models.BlogPost)
  };
  return Place_visited;
};
