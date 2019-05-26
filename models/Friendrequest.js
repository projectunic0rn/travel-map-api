'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define('FriendRequest', {
    senderId: {
      type: DataTypes.INTEGER
    },
    receiverId: {
      type: DataTypes.INTEGER
    },
    status: DataTypes.INTEGER
  }, {});
  FriendRequest.associate = function (models) {
    // associations can be defined here
  };
  return FriendRequest;
};