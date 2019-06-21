const { gql } = require('apollo-server');
const FriendRequestService = require('../services/friend_request.service');

const typeDefs = gql`
    extend type Query {
        friend_requests: [FriendRequest!]
    }

    extend type Mutation {
        sendFriendRequest(user_id: Int!): FriendRequest!
        acceptFriendRequest(friend_request_id: Int!): FriendRequest!
    }

    type FriendRequest {
       id: Int! 
       senderId: Int!
       receiverId: Int!
       status: Int!
    }
`


const resolvers = {
    Mutation: {
        sendFriendRequest: (_, { user_id }, context) => {
            return FriendRequestService.sendFriendRequest(context.user_id, user_id)
        },
        // acceptFriendRequest: (_, { friend_request_id }, context) => {
        //     return FriendRequestService.acceptFriendRequest(friend_request_id);
        // }
    },
    Query: {
        friend_requests: (_, __, context) => {
            return FriendRequestService.loadAllFriendRequests(context.user_id);
        }
    }
}


module.exports = {
    typeDefs,
    resolvers
}
