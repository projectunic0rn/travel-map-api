"use strict";
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define(
    "FriendRequest",
    {
      senderId: {
        type: DataTypes.INTEGER
      },
      receiverId: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      tableName: "friend_requests"
    }
  );
  FriendRequest.associate = function(models) {
    FriendRequest.belongsTo(models.User);
  };
  return FriendRequest;
};
