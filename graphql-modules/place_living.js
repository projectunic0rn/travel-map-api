const { gql } = require('apollo-server');
const PlaceLivingService = require('../services/place_living.service');


const typeDefs = gql`
    
    extend type Mutation {
        addPlaceLiving(country: String!, city: String!, description: String, living_time: String): Place_living
        removePlaceLiving(placeLivingId: Int!): Place_living

    }

    type Place_living {
        id: Int!,
        UserId: Int!
        country: String!
        city: String!
        description: String
        living_time: String
    }
`


const resolvers = {

    Mutation: {
        addPlaceLiving: (_, args, context) => {
            return PlaceLivingService.addPlaceLiving(context.user_id, args);
        },
        removePlaceLiving: (_, { placeLivingId }, context) => {
            return PlaceLivingService.removePlaceLiving(context.user_id, placeLivingId)

        }
    }
}



module.exports = {
    typeDefs,
    resolvers
}