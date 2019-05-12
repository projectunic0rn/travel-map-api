const { gql, AuthenticationError } = require('apollo-server');
const AuthService = require('../services/auth.service');
const PlaceVisited = require('../models').Place_visited;


const User = require('../models').User;

const typeDefs = gql`

type Query {
    test: String!
    users: [User!]

}

type Mutation {
        registerUser(username: String!, full_name: String!, email: String!, password: String!): Token
        loginUser(username: String!, password: String!): Token
    }

type User {
        id: Int!
        username: String!
        full_name: String!
        email: String!
        Places_visited: [Place_visited]
    }`

const resolvers = {
    Query: {
        test: () => "This is the test",
        users: async (_, args, context) => {
            try {
                let users = await User.findAll({
                    include: [PlaceVisited]
                });
                return users;
            } catch (err) {
                throw (err)
            }

        }
    },
    Mutation: {
        registerUser: async (_, args) => {
            return AuthService.registerUser(args);
        },
        loginUser: (_, args) => {
            return AuthService.loginUser(args.username, args.password)
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}