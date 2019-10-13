'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSocial = sequelize.define('UserSocial', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: "user_socials",
      name: {
        singular: 'UserSocial',
        plural: 'UserSocials'
      }
    });
    UserSocial.associate = function (models) {
    // associations can be defined here
    UserSocial.belongsTo(models.User)
  };
  return UserSocial;
};
