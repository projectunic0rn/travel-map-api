const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        test_interest: String!
    }

    type Mutation {
        addInterest
    }

    type Interest {
        name: String!
        User: User!
    }

`