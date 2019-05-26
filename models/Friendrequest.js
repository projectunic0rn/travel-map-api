'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define('FriendRequest', {
    senderId: {
      type: DataTypes.INTEGER
    },
    receiverId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {});
  FriendRequest.associate = function (models) {
    // associations can be defined here
  };
  return FriendRequest;
};