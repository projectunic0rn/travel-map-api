const User = require('../models').User;
const FriendRequest = require('../models').FriendRequest;
const Sequelize = require('sequelize');

let requestAlreadySent = async (userId, receiverId) => {
    let result = await FriendRequest.findAll({
        where: Sequelize.or(
            Sequelize.and(
                { senderId: userId },
                { receiverId: receiverId }
            ),
            Sequelize.and(
                { senderId: userId },
                { receiverId: receiverId }
            ),
        )
    });
    return result.length > 0;
}


let sendFriendRequest = async (current_user_id, receiver_id) => {
    try {
        if (requestAlreadySent(current_user_id, receiver_id)) {
            throw new Error("Friend request already in progress")
        }
        let currentUser = await User.findByPk(current_user_id);
        let receivingUser = await User.findByPk(receiver_id);
        if (!receivingUser) {
            throw new Error("The user you are tying to send a friend request to doesn't exist")
        }
        let friendRequestObj = {
            "senderId": currentUser.id,
            "receiverId": receivingUser.id,
            "status": 0
        }
        let request = await FriendRequest.create(friendRequestObj);
        return request;
    } catch (e) {
        throw Error(e)
    }
}

let loadAllFriendRequests = async (current_user_id) => {
    return await FriendRequest.findAll({
        where: Sequelize.and(
            { receiverId: current_user_id },
            { status: 0 }
        )
    })

}



module.exports = {
    sendFriendRequest,
    requestAlreadySent,
    loadAllFriendRequests
}