const { gql } = require('apollo-server');

const typeDefs = gql`

    type Token {
        token: String!
    }`



module.exports = {
    typeDefs
}