const User = require("../models").User;
const FriendRequest = require("../models").FriendRequest;
const UserInterests = require("../models").UserInterest;
const PlaceVisited = require("../models").Place_visited;
const PlaceLiving = require("../models").Place_living;
const PlaceVisiting = require("../models").Place_visiting;
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
    ),
  });
  return result.length !== 0;
};

let sendFriendRequest = async (current_user_id, receiving_username) => {
  try {
    let receivingUser = await User.findOne({
      where: { username: receiving_username },
    });
    if (!receivingUser) {
      throw new Error(
        "The user you are trying to send a friend request to doesn't exist"
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
    };
    let request = await FriendRequest.create(friendRequestObj);
    let socketFrObj = {
      sender: currentUser,
      receiver: receivingUser,
      friendRequestId: request.id,
    };
    socket.emit("friend-request", socketFrObj);
    return request;
  } catch (e) {
    throw Error(e);
  }
};

let getRequestsForUser = async (userId) => {
  // let receivingUser = await User.findByPk(userId);
  // console.log(receivingUser)
  // if (!receivingUser) {
  //   throw new Error(
  //     "The user you are trying to send a friend request to doesn't exist"
  //   );
  // }
  let pendingRequestArray = [];
  let result = await FriendRequest.findAll({
    where: Sequelize.and({ status: 0 }, { receiverId: userId }),
  });
  for (let i in result) {
    let user = await User.findOne({
      where: result[i].senderId,
      include: [
        { model: UserInterests },
        {
          model: PlaceVisited,
        },
        {
          model: PlaceLiving,
        },
        {
          model: PlaceVisiting,
        },
      ],
    });
    user.dataValues.requestId = result[i].dataValues.id;
    pendingRequestArray.push(user.dataValues);
  }
  return pendingRequestArray;
};

// Load all INCOMING friend requests;
// Will load all friend which the current user is the RECEIVER of the requests.
// TODO: Convert to GraphQL versions of INBOUND and OUTBOUND requests.

let loadAllFriendRequests = async (current_user_id) => {
  let fr = await db.sequelize.query(
    'SELECT fr.id AS fr_id, fr."createdAt" as fr_time_Sent, u.id AS "senderId", fr.status, u.username AS sender_username FROM friend_requests AS fr JOIN users u ON u.id = fr."senderId" WHERE fr."receiverId" = ? AND status = 0',
    { replacements: [current_user_id], type: Sequelize.QueryTypes.SELECT }
  );
  return fr;
};

let loadCurrentOutboundFriendRequests = async (current_user_id) => {
  // TODO
};

let acceptFriendRequest = async (friend_request_id) => {
  try {
    let friendsInvolved = await FriendRequest.findByPk(friend_request_id);
    let senderId = friendsInvolved.dataValues.senderId;
    let receiverId = friendsInvolved.dataValues.receiverId;
    console.log("senderID", senderId);
    let user = await User.findOne({
      where: { id: senderId },
    });
    let newFriend = await User.findOne({
      where: { id: receiverId },
    });
    console.log("user");
    console.log(user);
    user.addFriend(newFriend);
    newFriend.addFriend(user);
    await FriendRequest.update(
      { status: 1 },
      { where: { id: friend_request_id } }
    );
    return FriendRequest.findByPk(friend_request_id);
  } catch (e) {
    throw Error(e);
  }
};

let rejectFriendRequest = async (friend_request_id) => {
  try {
    await FriendRequest.update(
      { status: -1 },
      { where: { id: friend_request_id } }
    );
    return FriendRequest.findByPk(friend_request_id);
  } catch (e) {
    throw Error(e);
  }
};

let deleteFriend = async (current_user_id, friend_id) => {
  try {
    let friend = await FriendRequest.findOne({
      where: Sequelize.or(
        Sequelize.and({ senderId: current_user_id }, { receiverId: friend_id }),
        Sequelize.and({ senderId: friend_id }, { receiverId: current_user_id })
      ),
    });
    // if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
    //   throw new ForbiddenError("Not Authorized to delete user");
    // }
    return await friend.destroy().then((friend) => friend);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  sendFriendRequest,
  requestAlreadySent,
  getRequestsForUser,
  loadAllFriendRequests,
  deleteFriend,
  acceptFriendRequest,
  rejectFriendRequest,
};
