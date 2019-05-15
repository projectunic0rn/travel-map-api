'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInterests = sequelize.define('UserInterests', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: id
      },

    },
    InterestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Interest",
        key: id
      },

    }
  }, {});
  UserInterests.associate = function (models) {
    // associations can be defined here
  };
  return UserInterests;
};