const { gql} = require('apollo-server');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../secrets/secret');

const User = require('../models').user;

const typeDefs = gql`

type Query {
    test: String!

}

type Mutation {
        addUser(username: String!, full_name: String!, email: String!, password: String!): User
    }

type User {
        id: Int!
        username: String!
        full_name: String!
        email: String!
    }`

const resolvers = {
    Query: {
        test: () => "This is the test"
    },
    Mutation: {
        addUser: (_, args) => {
            return bcrypt.hash(args.password, saltRounds).then((hash) => {
                args.password = hash;
                return User.create(args).then(user => user)
            }).catch(e => e)
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}