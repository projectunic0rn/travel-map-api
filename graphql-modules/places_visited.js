const { gql } = require("apollo-server");
const PlaceVisited = require("../models").Place_visited;
const User = require("../models").User;
const PlaceVisitedService = require("../services/places_visited.service");

const typeDefs = gql`
  extend type Query {
    places_visited(
      id: Int
      UserId: Int
      country: String
      countryId: Float
      countryISO: String
      city: String
      cityId: Float
      city_latitude: Float
      city_longitude: Float
      year: Int
      days: Int
      trip_purpose: String
      trip_company: String
    ): [Place_visited!]
    Place_visited(id: Int!): [Place_visited!]
  }

  extend type Mutation {
    addPlaceVisited(
      country: Country!
      cities: [City!]
      description: String
      arriving_date: String
      departing_date: String
    ): [Place_visited!]!
    removePlaceVisited(placeVisitedId: Int!): Place_visited
    removePlacesInCountry(countryISO: String!): [Place_visited!]
    updateVisitedCityBasics(
      PlaceVisitedId: Int!
      cityBasics: CityBasics!
    ): Place_visited
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
    year: Int
    days: Int
    trip_purpose: String
    trip_company: String
    arriving_date: String
    departing_date: String
    CityReviews: [CityReviews!]
  }

  input CityBasics {
    year: Int
    days: Int
    trip_purpose: String
    trip_company: String
  }
`;

const resolvers = {
  Query: {
    places_visited: async (_, args) => {
      return await PlaceVisited.findAll({
        where: args
      });
    },
    Place_visited: async (_, args) => {
      let searchParameter = args.id;
      return PlaceVisitedService.loadPlacesVisited(searchParameter);
    }
  },
  Mutation: {
    addPlaceVisited: async (_, args, context) => {
      return await PlaceVisitedService.addPlaceVisited(context.user_id, args);
    },
    removePlaceVisited: async (_, { placeVisitedId }, context) => {
      return await PlaceVisitedService.removePlaceVisited(
        context.user_id,
        placeVisitedId
      );
    },
    // Depending on how we deal with this on the frontend (if userId is passed separately from the graphql mutation)
    // then the argument that accepts UserId can be removed. This will be a tentative
    // method until the frontend is finalized. Above typedef will look like:
    // removePlacesVisitedInCountry(countryISO: String!): [Place_visited!]
    removePlacesInCountry: async (_, args, context) => {
      return await PlaceVisitedService.removePlacesInCountry(
        context.user_id,
        args
      );
    },
    updateVisitedCityBasics: (_, args, context) => {
      return PlaceVisitedService.updateVisitedCityBasics(context.user_id, args);
    },
  }
};

module.exports = {
  typeDefs,
  resolvers
};
