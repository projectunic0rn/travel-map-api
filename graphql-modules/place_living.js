const { gql } = require('apollo-server');
const PlaceLiving = require('../models').Place_living;
const User = require('../models').User;
const PlaceLivingService = require('../services/place_living.service');


const typeDefs = gql`

    extend type Query {
        Places_living(country: Int, city: Int): [Place_living!]
    }
    
    extend type Mutation {
        addPlaceLiving(country: Int!, city: Int!, description: String, living_time: String): Place_living
        removePlaceLiving(placeLivingId: Int!): Place_living

    }

    type Place_living {
        id: Int!,
        UserId: Int!
        country: Int!
        city: Int!
        description: String
        living_time: String
    }
`


const resolvers = {

    Query: {
        Places_living: async (_, args) => {
            return await PlaceLiving.findAll({ where: args })
        }

    },

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