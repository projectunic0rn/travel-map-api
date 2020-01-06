'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING
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
    },
    gender: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
    avatarIndex: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.STRING,
    },
    georneyScore: {
      type: DataTypes.INTEGER
    }
  }, {
      tableName: 'users'
    });
  User.associate = function (models) {
    User.hasMany(models.Place_visited)
    User.hasMany(models.Place_visiting)
    User.hasOne(models.Place_living)
    User.hasMany(models.UserInterest)
    User.hasMany(models.UserSocial)
  };
  return User;
};
