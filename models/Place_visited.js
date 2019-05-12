'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place_visited = sequelize.define('Place_visited', {
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
    data_arrived: DataTypes.STRING,
    date_departed: DataTypes.STRING
  }, {
      tableName: 'places_visited',
      name: {
        singular: 'Place_visited',
        plural: 'Places_visited'
      }
    });
  Place_visited.associate = function (models) {
    Place_visited.belongsTo(models.User)

  };
  return Place_visited;
};