const { gql} = require('apollo-server');

const typeDefs = gql`
    

    extend type Query {
        tokenTest: String!
    }

    type Token {
        token: String!
    }

`

const resolvers = {
    Query: {
        tokenTest: () => "Token working"
    },
}

module.exports = {
    typeDefs, 
    resolvers
}