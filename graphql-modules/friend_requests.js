const { gql } = require("apollo-server");
const FriendRequestService = require("../services/friend_request.service");

const typeDefs = gql`
  extend type Query {
    friend_requests: [FriendRequestPayload]
  }

  extend type Mutation {
    sendFriendRequest(username: String!): FriendRequest!
    acceptFriendRequest(friend_request_id: Int!): FriendRequest!
  }

  type FriendRequest {
    id: Int!
    senderId: Int!
    receiverId: Int!
    status: Int!
    UserId: Int!
  }

  type FriendRequestPayload {
    receiverId: Int!
    senderId: Int!
    status: Int!
    # senderUsername: String!
    # requestSentAt: String!
    User: User
  }
`;

const resolvers = {
  Mutation: {
    sendFriendRequest: (_, { username }, context) => {
      return FriendRequestService.sendFriendRequest(context.user_id, username);
    },
    acceptFriendRequest: (_, { friend_request_id }, context) => {
      return FriendRequestService.acceptFriendRequest(friend_request_id);
    }
  },
  Query: {
    friend_requests: (_, __, context) => {
      return FriendRequestService.loadAllFriendRequests(context.user_id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
