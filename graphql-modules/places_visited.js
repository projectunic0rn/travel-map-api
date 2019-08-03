const {
    gql
} = require('apollo-server');
const PlaceVisited = require('../models').Place_visited;
const User = require('../models').User;
const PlaceVisitedService = require('../services/places_visited.service');

const typeDefs = gql `
    extend type Query {
        places_visited(id: Int, UserId: Int, country: String, countryId: Float, countryISO: String, city: String, cityId: Float, city_latitude: Float, city_longitude: Float): Place_visited!
    }

    extend type Mutation {
        addPlaceVisited(country: Country!, cities: [City!], desription: String, arriving_date: String, departing_date: String): [Place_visited!]!
        removePlaceVisited(placeVisitedId: Int!): Place_visited
    }

    type Place_visited {
        id: Int!
        UserId: Int!
        country: String!
        countryId: Float!
        countryISO: String!
        city: String
        cityId: Float
        city_latitude: Float
        city_longitude: Float
        arriving_date: String
        departing_date: String
    }
`


const resolvers = {
    Query: {
        places_visited: async (_, args) => {
            return await PlaceVisited.findAll({
                where: args
            })
        }
    },
    Mutation: {
        addPlaceVisited: async (_, args, context) => {
            return await PlaceVisitedService.addPlaceVisited(context.user_id, args);
        },
        removePlaceVisited: async (_, {
            placeVisitedId
        }, context) => {
            return await PlaceVisitedService.removePlaceVisited(context.user_id, placeVisitedId);
        }

    }
}

module.exports = {
    typeDefs,
    resolvers
}
