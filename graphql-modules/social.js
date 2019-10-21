const { gql } = require("apollo-server");
const UserSocialService = require("../services/userSocials.service");


const typeDefs = gql`
  extend type Mutation {
    addSocial(userSocials: [UserSocial!]): [UserSocials!]!
  }

  type UserSocials {
    id: Int!
    UserId: Int!
    name: String!
    link: String!
  }

  input UserSocial {
    id: Int!
    name: String!
    link: String!
  }
`;

const resolvers = {
  Mutation: {
    addSocial: async (_, args, context) => {
      return UserSocialService.addUserSocials(context.user_id, args);
    },
  }
};

module.exports = {
  typeDefs,
  resolvers
};
