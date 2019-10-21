"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      full_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      tableName: "users"
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Place_visited);
    User.hasMany(models.Place_visiting);
    User.hasOne(models.Place_living);
    User.hasMany(models.FriendRequest);
    User.hasMany(models.User);
    User.belongsToMany(models.FriendRequest, {
      as: "User",
      through: "FriendRequestId"
    });
    User.belongsToMany(models.User, {
      as: "friend",
      through: "friends"
    });
    User.hasMany(models.UserInterest);
    User.hasMany(models.UserSocial);
  };
  return User;
};
