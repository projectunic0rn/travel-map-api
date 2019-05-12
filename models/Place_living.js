'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place_living = sequelize.define('Place_living', {
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    description: DataTypes.STRING,
    living_time: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    }
  }, {
      tableName: "places_living",
    });
  Place_living.associate = function (models) {
    Place_living.belongsTo(models.User)
    // associations can be defined here
  };
  return Place_living;
};