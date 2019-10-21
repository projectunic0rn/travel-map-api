'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInterest = sequelize.define('UserInterest', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: "user_interests",
      name: {
        singular: 'UserInterest',
        plural: 'UserInterests'
      }
    });
  UserInterest.associate = function (models) {
    // associations can be defined here
    UserInterest.belongsTo(models.User)
  };
  return UserInterest;
};
