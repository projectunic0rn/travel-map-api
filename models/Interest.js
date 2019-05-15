'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    name: DataTypes.STRING
  }, {});
  Interest.associate = function (models) {
    // associations can be defined here
    Interest.belongsToMany(models.User, {
      through: 'UserInterests',
      as: 'users',
      foreignKey: 'InterestId'
    })
  };
  return Interest;
};