const { gql } = require('apollo-server');
const AuthService = require('../services/auth.service');
const UserService = require('../services/users.service');

const typeDefs = gql`

type Query {
    test: String!
    user(id: Int, username: String): User
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
        Place_living: Place_living,
        Interests: [Interest!]
    }`

const resolvers = {
    Query: {
        test: () => "This is the test",
        user: (_, args) => {
            return UserService.searchUser(args)
        },
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