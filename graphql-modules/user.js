const { gql, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
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
        users: async (_, args, context) => {
            try {
                let users = await User.findAll();
                return users;
            } catch(err) {
                throw (err)
            }
            
        }
    },
    Mutation: {
        registerUser: async (_, args) => {
            try {
                let hash = await bcrypt.hash(args.password, saltRounds);
                args.password = hash;
                let user = await User.create(args);
                return AuthService.returnUserToken(user);

            } catch (err) {
                throw (err)
            }
        },
        loginUser: (_, args) => {

        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}