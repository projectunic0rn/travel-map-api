const { gql } = require("apollo-server");
const BlogPostService = require("../services/blogPosts.service");

const typeDefs = gql`
  extend type Mutation {
    addBlogPosts (blogPosts: [BlogPost!]): [BlogPosts!]!
    removeBlogPost(id: Int!): BlogPosts!
  }

  type BlogPosts {
    id: Int!
    blogPlaceId: Int!
    PlaceVisitedId: Int
    url: String!
    name: String!
    type: String!
    year: Int
  }

  input BlogPost {
    id: Int!
    blogPlaceId: Int!
    url: String!
    name: String!
    type: String!
    year: Int
  }
`;

const resolvers = {
  Mutation: {
    addBlogPosts: (_, args, context) => {
      return BlogPostService.addBlogPosts(context.user_id, args);
    },
    removeBlogPost: (_, { id }, context) => {
      return BlogPostService.removeBlogPost(context.user_id, id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
