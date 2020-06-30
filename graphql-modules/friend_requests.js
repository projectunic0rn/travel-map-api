const { gql } = require("apollo-server");
const FriendRequestService = require("../services/friend_request.service");

const typeDefs = gql`
  extend type Query {
    getRequestsForUser: [FriendRequestPayload]
    friend_requests: [FriendRequestPayload!]
  }

  extend type Mutation {
    sendFriendRequest(username: String!): FriendRequest!
    acceptFriendRequest(friend_request_id: Int!): FriendRequest!
    rejectFriendRequest(friend_request_id: Int!): FriendRequest!
  }

  type FriendRequest {
    id: Int!
    senderId: Int!
    receiverId: Int!
    status: Int!
  }

  type FriendRequestPayload {
    id: Int!
    username: String!
    avatarIndex: Int!
    color: String!
    georneyScore: Float!
    fr_time_Sent: String
  }
`;

const resolvers = {
  Mutation: {
    sendFriendRequest: (_, { username }, context) => {
      return FriendRequestService.sendFriendRequest(context.user_id, username);
    },
    acceptFriendRequest: (_, { friend_request_id }, context) => {
      return FriendRequestService.acceptFriendRequest(friend_request_id);
    },
    rejectFriendRequest: (_, { friend_request_id }, context) => {
      return FriendRequestService.rejectFriendRequest(friend_request_id);
    },
  },
  Query: {
    friend_requests: (_, __, context) => {
      return FriendRequestService.loadAllFriendRequests(context.user_id);
    },
    getRequestsForUser: async (_, args, context) => {
      // let argsFormatted = JSON.parse(JSON.stringify(args));
      return FriendRequestService.getRequestsForUser(context.user_id, args);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
