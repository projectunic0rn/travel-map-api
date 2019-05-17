const { gql } = require('apollo-server');

const typeDefs = gql`
    

    extend type Query {
        tokenTest: String!
    }

    type Token {
        token: String!
    }`



module.exports = {
    typeDefs
}