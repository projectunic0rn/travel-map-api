'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    name: DataTypes.STRING
  }, {
      tableName: 'interests',
      timestamps: false,
    });
  Interest.associate = function (models) {
    // associations can be defined here
    // Interest.belongsToMany(models.User, {
    //   through: 'UserInterest',
    //   as: 'Users',
    //   foreignKey: 'InterestId'
    // })
  };
  return Interest;
};