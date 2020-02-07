const { gql } = require("apollo-server");
const CityReviewService = require("../services/cityReviews.service");

const typeDefs = gql`
  extend type Mutation {
    addPastCityReviews(cityReviews: [CityReview!]): [CityReviews!]!
    addFutureCityReviews(cityReviews: [CityReview!]): [CityReviews!]!
    addLivingCityReviews(cityReviews: [CityReview!]): [CityReviews!]!
    removeCityReviews(CityReviewId: Int!): CityReviews!
  }

  type CityReviews {
    id: Int!
    reviewPlaceId: String!
    review_latitude: Float
    review_longitude: Float
    PlaceVisitedId: Int
    PlaceVisitingId: Int
    PlaceLivingId: Int
    attraction_type: String!
    attraction_name: String!
    rating: Int!
    comment: String
    cost: Int
    currency: String
  }

  input CityReview {
    id: Int!
    reviewPlaceId: String!
    review_latitude: Float
    review_longitude: Float
    PlaceVisitedId: Int
    PlaceVisitingId: Int
    PlaceLivingId: Int
    attraction_type: String!
    attraction_name: String!
    rating: Int
    comment: String
    cost: Int
    currency: String
  }
`;

const resolvers = {
  Mutation: {
    addPastCityReviews: (_, args, context) => {
      return CityReviewService.addPastCityReviews(context.user_id, args);
    },
    addFutureCityReviews: (_, args, context) => {
      return CityReviewService.addFutureCityReviews(context.user_id, args);
    },
    addLivingCityReviews: (_, args, context) => {
      return CityReviewService.addLivingCityReviews(context.user_id, args);
    },
    removeCityReviews: (_, { CityReviewId }, context) => {
      return CityReviewService.removeCityReviews(context.user_id, CityReviewId);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
