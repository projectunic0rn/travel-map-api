"use strict";
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define(
    "FriendRequest",
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {
      tableName: "friend_requests"
    }
  );
  FriendRequest.associate = function(models) {
    FriendRequest.belongsTo(models.User);
    // associations can be defined here
  };
  return FriendRequest;
};
