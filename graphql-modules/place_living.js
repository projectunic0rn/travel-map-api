const { gql } = require('apollo-server');
const PlaceLiving = require('../models').Place_living;
const User = require('../models').User;
const PlaceLivingService = require('../services/place_living.service');


const typeDefs = gql`

    extend type Query {
        Place_living(id: Int, UserId: Int, country: String, countryId: Float, countryISO: String, city: String, cityId: Float, city_latitude: Float, city_longitude: Float): Place_living!
    }

    extend type Mutation {
        addPlaceLiving(country: Country!, cities: [City!], description: String, living_time: String): [Place_living!]!
        removePlaceLiving(placeLivingId: Int!): Place_living
        updatePlaceLiving(id: Int!, country: Country, cities: [City], description: String, living_time: String): Place_living
    }

    type Place_living {
        id: Int!
        UserId: Int!
        country: String!
        countryId: Float!
        countryISO: String!
        city: String
        cityId: Float
        city_latitude: Float
        city_longitude: Float
        living_time: String
    }
`


const resolvers = {

    Query: {
        Place_living: async (_, args) => {
            return await PlaceLiving.findAll({ where: args })
        }

    },

    Mutation: {
        addPlaceLiving: (_, args, context) => {
            return PlaceLivingService.addPlaceLiving(context.user_id, args);
        },
        removePlaceLiving: (_, { placeLivingId }, context) => {
            return PlaceLivingService.removePlaceLiving(context.user_id, placeLivingId)
        },
        updatePlaceLiving: (_, args, context) => {
            return PlaceLivingService.updatePlaceLiving(context.user_id, args);
        }

    }
}



module.exports = {
    typeDefs,
    resolvers
}
