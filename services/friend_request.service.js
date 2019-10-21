const User = require("../models").User;
const FriendRequest = require("../models").FriendRequest;
const Sequelize = require("sequelize");
const db = require("../models/index");
const socket = require("../socket");

let requestAlreadySent = async (userId, receiverId) => {
  let receivingUser = await User.findByPk(receiverId);
  if (!receivingUser) {
    throw new Error(
      "The user you are trying to send a friend request to doesn't exist"
    );
  }
  let result = await FriendRequest.findAll({
    where: Sequelize.or(
      Sequelize.and({ senderId: userId }, { receiverId: receivingUser.id }),
      Sequelize.and({ senderId: receivingUser.id }, { receiverId: userId })
    )
  });
  return result.length !== 0;
};

let sendFriendRequest = async (current_user_id, receiving_username) => {
  try {
    let receivingUser = await User.findOne({
      where: { username: receiving_username }
    });
    if (!receivingUser) {
      throw new Error(
        "The user you are tying to send a friend request to doesn't exist"
      );
    }

    let isDuplicateRequest = await requestAlreadySent(
      current_user_id,
      receivingUser.id
    );
    if (isDuplicateRequest) {
      throw new Error("Friend request already in progress");
    }
    let currentUser = await User.findByPk(current_user_id);
    let friendRequestObj = {
      senderId: currentUser.id,
      receiverId: receivingUser.id,
      status: 0,
      UserId: currentUser.id
    };
    let request = await FriendRequest.create(friendRequestObj);
    let updatedUser = await User.update(
      { FriendRequestId: request.id },
      { where: currentUser }
    );
    let socketFrObj = {
      sender: currentUser,
      receiver: receivingUser,
      friendRequestId: request.id
    };
    socket.emit("friend-request", socketFrObj);
    return request;
  } catch (e) {
    throw Error(e);
  }
};

let loadAllFriendRequests = async (current_user_id) => {
  try {
    // let fr = await db.sequelize.query(
    //   "SELECT receiverId, fr.createdAt as requestSentAt, u.*, u.id AS senderId, fr.status, u.username AS senderUsername FROM friend_requests AS fr JOIN users u ON u.id = fr.senderId AND status = 0",
    //   {
    //     replacements: [current_user_id],
    //     type: Sequelize.QueryTypes.SELECT
    //   }
    // );

    let fr = await FriendRequest.findAll({
      where: { receiverId: current_user_id },
      include: [
        {
          model: User,
          as: "User",
          required: false
        }
      ]
    });
    console.log(fr);
    return await fr;
  } catch (e) {
    throw Error(e);
  }
};

let acceptFriendRequest = async (friend_request_id) => {
  try {
    let updatedRequestId = await FriendRequest.update(
      { status: 1 },
      { where: { id: friend_request_id } }
    );
    return FriendRequest.findByPk(updatedRequestId[0]);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  sendFriendRequest,
  requestAlreadySent,
  loadAllFriendRequests,
  acceptFriendRequest
};
