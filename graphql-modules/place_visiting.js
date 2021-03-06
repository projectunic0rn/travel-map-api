const { gql } = require("apollo-server");
const PlaceVisitingService = require("../services/place_visiting.service");
const PlaceVisiting = require("../models/Place_visiting");

const typeDefs = gql`
  extend type Mutation {
    addPlaceVisiting(
      country: Country!
      cities: [City!]
      desription: String
      arrival_date: String
      departing_date: String
    ): [Place_visiting!]!
    removePlaceVisiting(placeVisitingId: Int!): Place_visiting
    updateVisitingCityBasics(
      PlaceVisitingId: Int!
      cityBasics: CityBasics!
    ): Place_visiting
    updateVisitingCityComments(
      PlaceVisitingId: Int!
      cityComments: CityComments!
    ): Place_visiting
  }

  extend type Query {
    Place_visiting(
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
      best_comment: String
      hardest_comment: String
      trip_purpose: String
      trip_company: String
    ): Place_visiting!
    City_visiting_all_users(cityId: Int!): [Place_visiting!]
  }

  type Place_visiting {
    id: Int!
    UserId: Int!
    country: String!
    countryId: Float!
    countryISO: String!
    city: String
    cityId: Float
    city_latitude: Float
    city_longitude: Float
    arrival_date: String
    departing_date: String
    year: Int
    days: Int
    best_comment: String
    hardest_comment: String
    trip_purpose: String
    trip_company: String
    CityReviews: [CityReviews!]
  }

  input City {
    city: String!
    cityId: Float!
    city_latitude: Float!
    city_longitude: Float!
  }

  input Country {
    country: String!
    countryId: Float!
    countryISO: String!
  }
`;

const resolvers = {
  Mutation: {
    addPlaceVisiting: (_, args, context) => {
      return PlaceVisitingService.addPlaceVisiting(context.user_id, args);
    },
    removePlaceVisiting: (_, { placeVisitingId }, context) => {
      return PlaceVisitingService.removePlaceVisiting(
        context.user_id,
        placeVisitingId
      );
    },
    updateVisitingCityBasics: (_, args, context) => {
      return PlaceVisitingService.updateVisitingCityBasics(context.user_id, args);
    },
    updateVisitingCityComments: (_, args, context) => {
      return PlaceVisitingService.updateVisitingCityComments(context.user_id, args);
    },
  },
  Query: {
    Place_visiting: async (_, args) => {
      return await PlaceVisiting.findAll({
        where: args
      });
    },
    City_visiting_all_users: async (_, args) => {
      let searchParameter = args.cityId;
      return PlaceVisitingService.loadCityVisiting(searchParameter);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
