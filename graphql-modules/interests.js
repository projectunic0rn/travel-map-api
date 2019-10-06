const { gql } = require("apollo-server");
const User = require("../models").User;
const Interest = require("../models").Interest;
const UserInterestService = require("../services/userInterests.service");

const typeDefs = gql`
  extend type Mutation {
    addInterest(userInterests: [UserInterest!]): [UserInterests!]!
    addInterestType(name: String!): Interest!
  }

  type Interest {
    id: Int!
    name: String
  }

  type UserInterests {
    id: Int!
    UserId: Int!
    name: String!
  }

  input UserInterest {
    id: Int!
    name: String!
  }
`;

const resolvers = {
  Mutation: {
    addInterest: async (_, args, context) => {
      return UserInterestService.addUserInterests(context.user_id, args);
    },
    addInterestType: async (_, { name }) => {
      try {
        let request = await Interest.create({ name: name });
        return request;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
