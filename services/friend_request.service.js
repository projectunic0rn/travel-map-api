const User = require('../models').User;
const FriendRequest = require('../models').FriendRequest;
const Sequelize = require('sequelize');
const db = require('../models/index');

const io = require('socket.io-client')

const socket = io('https://travel-map-socket-service.herokuapp.com/');


let requestAlreadySent = async (userId, receiverId) => {
    let receivingUser = await User.findByPk(receiverId);
    if (!receivingUser) {
        throw new Error("The user you are trying to send a friend request to doesn't exist");
    }
    let result = await FriendRequest.findAll({
        where: Sequelize.or(
            Sequelize.and(
                { senderId: userId },
                { receiverId: receivingUser.id }
            ),
            Sequelize.and(
                { senderId: receivingUser.id },
                { receiverId: userId }
            ),
        )
    });
    return result.length !== 0;
}


let sendFriendRequest = async (current_user_id, receiving_username) => {
    try {
        let receivingUser = await User.findOne({ where: {username: receiving_username}});
        if (!receivingUser) {
            throw new Error("The user you are tying to send a friend request to doesn't exist")
        }

        let isDuplicateRequest = await requestAlreadySent(current_user_id, receivingUser.id);
        if (isDuplicateRequest) {
            throw new Error("Friend request already in progress")
        }
        let currentUser = await User.findByPk(current_user_id);
        let friendRequestObj = {
            "senderId": currentUser.id,
            "receiverId": receivingUser.id,
            "status": 0
        }
        let request = await FriendRequest.create(friendRequestObj);
        let socketFrObj = {
            "sender": currentUser,
            "receiver": receivingUser,
            "friendRequestId": request.id
        }
        socket.emit("friend-request", socketFrObj);
        return request;
    } catch (e) {
        throw Error(e)
    }
}

let loadAllFriendRequests = async (current_user_id) => {
    let fr = await db.sequelize.query("SELECT fr.id AS fr_id, fr.createdAt as fr_time_Sent, u.id AS sender_id, fr.status, u.username AS sender_username FROM friend_requests AS fr JOIN users u ON u.id = fr.senderId WHERE fr.receiverId = ? AND status = 0", {
        replacements: [current_user_id],
        type: Sequelize.QueryTypes.SELECT
    });
    return fr;
}

let acceptFriendRequest = async (friend_request_id) => {
    try {
        let updatedRequestId = await FriendRequest.update({ status: 1 }, { where: { id: friend_request_id } });
        return FriendRequest.findByPk(updatedRequestId[0]);
    } catch (e) {
        throw Error(e)
    }

}



module.exports = {
    sendFriendRequest,
    requestAlreadySent,
    loadAllFriendRequests,
    acceptFriendRequest
}
