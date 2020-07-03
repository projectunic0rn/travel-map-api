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
    deleteFriend(friend_id: Int!): FriendRequest!
  }

  type FriendRequest {
    id: Int!
    senderId: Int!
    receiverId: Int!
    status: Int!
  }

  type FriendRequestPayload {
    id: Int!
    requestId: Int!
    username: String!
    avatarIndex: Int!
    color: String!
    georneyScore: Float!
    UserInterests: [UserInterests!]
    Place_living: Place_living
    Places_visited: [Place_visited!]
    Places_visiting: [Place_visiting!]
    fr_time_Sent: String
  }
`;

const resolvers = {
  Mutation: {
    sendFriendRequest: (_, { username }, context) => {
      return FriendRequestService.sendFriendRequest(context.user_id, username);
    },
    acceptFriendRequest: (_, { friend_request_id }) => {
      return FriendRequestService.acceptFriendRequest(friend_request_id);
    },
    rejectFriendRequest: (_, { friend_request_id }) => {
      return FriendRequestService.rejectFriendRequest(friend_request_id);
    },
    deleteFriend: (_, { friend_id }, context) => {
      return FriendRequestService.deleteFriend(context.user_id, friend_id);
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
