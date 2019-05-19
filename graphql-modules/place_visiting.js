const { gql } = require('apollo-server');
const PlaceVisitingService = require('../services/place_visiting.service');


const typeDefs = gql`

    extend type Mutation {
        addPlaceVisiting(country: String!, city: String!, desription: String, arrival_date: String, departing_date: String): Place_visiting
        removePlaceVisiting(placeVisitingId: Int!): Place_visiting

    }

    type Place_visiting {
        id: String!
        UserId: Int!
        country: String!
        city: String!
        arrival_date: String
        departing_date: String
    }

`

const resolvers = {
    Mutation: {
        addPlaceVisiting: (_, args, context) => {
            return PlaceVisitingService.addPlaceVisiting(context.user_id, args);
        },
        removePlaceVisiting: (_, { placeVisitingId }, context) => {
            return PlaceVisitingService.removePlaceVisiting(context.user_id, placeVisitingId);
        }

    }

}

module.exports = {
    typeDefs,
    resolvers
}