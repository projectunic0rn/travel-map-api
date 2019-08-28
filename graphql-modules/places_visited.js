const {
    gql
} = require('apollo-server');
const PlaceVisited = require('../models').Place_visited;
const User = require('../models').User;
const PlaceVisitedService = require('../services/places_visited.service');

const typeDefs = gql `
    extend type Query {
        places_visited(id: Int, UserId: Int, country: String, countryId: Float, countryISO: String, city: String, cityId: Float, city_latitude: Float, city_longitude: Float): [Place_visited!]
    }

    extend type Mutation {
        addPlaceVisited(country: Country!, cities: [City!], description: String, arriving_date: String, departing_date: String): [Place_visited!]!
        removePlaceVisited(placeVisitedId: Int!): Place_visited
        removePlacesVisitedInCountry(userId: Int!, countryISO: String!): [Place_visited!]
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
      },
      // Depending on how we deal with this on the frontend (if userId is passed separately from the graphql mutation)
      // then the argument that accepts UserId can be removed. This will be a tentative
      // method until the frontend is finalized. Above typedef will look like:
      // removePlacesVisitedInCountry(countryISO: String!): [Place_visited!]
      removePlacesVisitedInCountry: async (_, args) => {
        return await PlaceVisitedService.removePlacesVisitedInCountry(args)
      }
      // removePlacesVisitedInCountry: async (_, args, context) => {
      //   return await PlaceVisitedService.removePlacesVisitedInCountry(context.user_id, args)
      // }
      // This will be the variation of the method that takes userId separately from the graphql mutation
      // Since it will be separated, we need to add the context argument
    }
}

module.exports = {
    typeDefs,
    resolvers
}
