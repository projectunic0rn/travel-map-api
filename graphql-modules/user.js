const { gql } = require('apollo-server');
const AuthService = require('../services/auth.service');
const UserService = require('../services/users.service');

const typeDefs = gql`

type Query {
    user(id: Int, username: String): User
    users: [User!]
    getLoggedInUser: User
    test: String!

}

type Mutation {
        registerUser(username: String!, full_name: String!, email: String!, password: String!): Token
        loginUser(username: String!, password: String!): Token
        deleteUser(id: Int!): User
    }

type User {
        id: Int!
        username: String!
        full_name: String!
        email: String!
        Places_visited: [Place_visited!]
        Place_living: Place_living,
        Interests: [Interest!]
        Places_visiting: [Place_visiting!]
    }`

const resolvers = {
    Query: {
        test: () => {
            return "THIS IS WORKING"
        },
        user: (_, args) => {
            return UserService.searchUser(args)
        },
        users: (_, args) => {
            return UserService.loadAllUsers(args);
        },
        getLoggedInUser: (_, args, context) => {
            return UserService.getLoggedInUser(context.user_id);
        }
    },
    Mutation: {
        registerUser: (_, args) => {
            return AuthService.registerUser(args);
        },
        loginUser: (_, args) => {
            return AuthService.loginUser(args.username, args.password)
        },
        // Depending on how we deal with this on the frontend (if userId is passed separately from the graphql mutation)
        // then the argument that accepts id can be removed. This will be a tentative
        // method until the frontend is finalized. Above typedef will look like:
        // deleteUser(): User
        deleteUser: (_, args) => {
            return UserService.deleteUser(args)
        }
        // deleteUser: async (_, args, context) => {
        //   return await UserService.deleteUser(context.user_id)
        // }
        // The "context.user_id" is whatever is passed via frontend, so this is subject to change.
        // This will be the variation of the method that takes userId separately from the graphql mutation
        // Since it will be separated, we need to add the context argument

    }
}

module.exports = {
    typeDefs,
    resolvers
}
