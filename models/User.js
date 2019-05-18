'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
      tableName: 'users'
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Place_visited)
    User.hasMany(models.Place_visiting)
    User.hasOne(models.Place_living)
    User.belongsToMany(models.Interest, {
      through: 'UserInterests',
      as: 'Interests',
      foreignKey: 'UserId'
    })
  };
  return User;
};