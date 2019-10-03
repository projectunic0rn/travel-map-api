'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInterest = sequelize.define('UserInterest', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "User",
    //     key: "id"
    //   },
    // },
    // InterestId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Interest",
    //     key: "id"
    //   },

    // }
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