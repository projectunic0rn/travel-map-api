const { gql, AuthenticationError } = require('apollo-server');
const User = require('../models').User;
const PlaceVisitedService = require('../services/places_visited.service');

const typeDefs = gql`
    extend type Query {
        test_places_visited: String!
    }

    extend type Mutation {
        addPlaceVisited(country: String!, city: String!, description: String, date_arrived: String, date_departed: String): Place_visited
    }

    type Place_visited {
        id: Int!
        country: String!
        city: String!
        description: String
        date_arrived: String
        date_departed: String
    }
`


const resolvers = {
    Query: {
        test_places_visted: () => "Places visited works"
    },
    Mutation: {
        addPlaceVisited: async (_, args, context) => {
            return PlaceVisitedService.addPlaceVisited(context.user_id, args);
        }

    }
}

module.exports = {
    typeDefs,
    resolvers
}