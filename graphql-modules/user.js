const { gql } = require('apollo-server');
const AuthService = require('../services/auth.service');
const UserService = require('../services/users.service');


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
        Places_visited: [Place_visited!]
    }`

const resolvers = {
    Query: {
        test: () => "This is the test",
        users: (_, args, context) => {
            return UserService.loadAllUsers(args);
        }
    },
    Mutation: {
        registerUser: (_, args) => {
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