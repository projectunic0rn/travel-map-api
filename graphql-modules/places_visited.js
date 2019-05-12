const { gql, AuthenticationError } = require('apollo-server');
const PlaceVisited = require('../models').Place_visited;
const PlaceVisitedService = require('../services/places_visited.service');

const typeDefs = gql`
    extend type Query {
        test_places_visited: String!
        places_visited(UserId: Int, country: String, city: String): [Place_visited!]
    }

    extend type Mutation {
        addPlaceVisited(country: String!, city: String!, description: String, date_arrived: String, date_departed: String): Place_visited
    }

    type Place_visited {
        id: Int!
        UserId: Int!
        country: String!
        city: String!
        description: String
        date_arrived: String
        date_departed: String
    }
`


const resolvers = {
    Query: {
        test_places_visted: () => "Places visited works",
        places_visited: async (_, args) => {
            let places = await PlaceVisited.findAll({ where: args })
            return places;
        }
    },
    Mutation: {
        addPlaceVisited: async (_, args, context) => {
            return await PlaceVisitedService.addPlaceVisited(context.user_id, args);
        }

    }
}

module.exports = {
    typeDefs,
    resolvers
}