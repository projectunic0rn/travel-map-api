const { gql } = require("apollo-server");
const PlaceLiving = require("../models").Place_living;
const User = require("../models").User;
const PlaceLivingService = require("../services/place_living.service");

const typeDefs = gql`
  extend type Query {
    Place_living(
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
    ): Place_living!
    place_living(id: Int!): Place_living!
    City_living_all_users(cityId: Int!): [Place_living!]
  }

  extend type Mutation {
    addPlaceLiving(
      country: Country!
      cities: City
      description: String
      living_time: String
    ): Place_living!
    removePlaceLiving(placeLivingId: Int!): Place_living
    updatePlaceLiving(
      id: Int!
      country: Country!
      cities: City
      description: String
      living_time: String
    ): Place_living
    updateLivingCityBasics(
      PlaceLivingId: Int!
      cityBasics: CityBasics!
    ): Place_living
    updateLivingCityComments(
      PlaceLivingId: Int!
      cityComments: CityComments!
    ): Place_living
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
    year: Int
    days: Int
    best_comment: String
    hardest_comment: String
    trip_purpose: String
    trip_company: String
    CityReviews: [CityReviews!]
  }
`;

const resolvers = {
  Query: {
    Place_living: async (_, args) => {
      return await PlaceLiving.findAll({ where: args });
    },
    place_living: async (_, args) => {
      let searchParameter = args.id;
      return PlaceLivingService.loadPlaceLiving(searchParameter);
    },
    City_living_all_users: async (_, args) => {
      let searchParameter = args.cityId;
      return PlaceLivingService.loadCityLiving(searchParameter);
    }
  },

  Mutation: {
    addPlaceLiving: (_, args, context) => {
      return PlaceLivingService.addPlaceLiving(context.user_id, args);
    },
    removePlaceLiving: (_, { placeLivingId }, context) => {
      return PlaceLivingService.removePlaceLiving(
        context.user_id,
        placeLivingId
      );
    },
    // Depending on how we deal with this on the frontend (if userId is passed separately from the graphql mutation)
    // then the argument that accepts UserId can be removed. This will be a tentative
    // method until the frontend is finalized. Above typedef will look like this:
    // updatePlaceLiving(id: Int!, country: Country!, cities: [City!], description: String, living_time: String): Place_living
    updatePlaceLiving: (_, args, context) => {
      return PlaceLivingService.updatePlaceLiving(context.user_id, args);
    },
    updateLivingCityBasics: (_, args, context) => {
      return PlaceLivingService.updateLivingCityBasics(context.user_id, args);
    },
    updateLivingCityComments: (_, args, context) => {
      return PlaceLivingService.updateLivingCityComments(context.user_id, args);
    }
    // updatePlaceLiving: (_, args, context) => {
    //     return PlaceLivingService.updatePlaceLiving(context.user_id, args);
    // }
    // This will be the variation of the method that receives userId from the front end
    // Since it will be separated, we need to add the context argument
  }
};

module.exports = {
  typeDefs,
  resolvers
};
