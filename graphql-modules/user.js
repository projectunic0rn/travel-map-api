const { gql, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../secrets/secret');
const AuthService = require('../services/auth.service');
const { tokenSecret } = require('../secrets/secret');


const User = require('../models').user;

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
    }`

const resolvers = {
    Query: {
        test: () => "This is the test",
        users: (_, args, context) => {
            return User.findAll().then(users => users).catch(e => e)
        }
    },
    Mutation: {
        registerUser: (_, args) => {
            return bcrypt.hash(args.password, saltRounds).then((hash) => {
                args.password = hash;
                return User.create(args).then(user => {
                   return AuthService.returnUserToken(user)
                })
            }).catch(e => e)
        },
        loginUser: (_, args) => {

        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}