const { gql} = require('apollo-server');
const bcrypt = require('bcrypt');

const User = require('./models').user;

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
                bcrypt.hash(args.password, 13, function(err, hash) {
                if (err) {
                    return err
                }
                args.password = hash
                return User.create(args).then(user => user).catch(e => e)
                });
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}