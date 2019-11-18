const User = require("../models").User;
const PlaceVisited = require("../models").Place_visited;
const PlaceVisiting = require("../models").Place_visiting;
const PlaceLiving = require("../models").Place_living;
const CityReviews = require("../models").CityReview;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");

let addPastCityReviews = async (userId, cityReviewData) => {
  try {
    let placeRecord = await PlaceVisited.findByPk(cityReviewData.cityReviews[0].PlaceVisitedId);
    // if (AuthService.isNotLoggedIn(user)) {
    //   throw new ForbiddenError(
    //     "Not Authorized to add city reviews to someone elses account"
    //   );
    // }
    let cityReviews = [];

    // Loop through each review they have provided ... create individual records
    for (let review of cityReviewData.cityReviews) {
        let cityReview = placeRecord.createCityReview({
            PlaceVisitedId: review.PlaceVisitedId,
            attraction_type:review.attraction_type,
            attraction_name:review.attraction_name, 
            rating:review.rating,
            comment:review.comment,
            cost:review.cost,
            currency:review.currency
        });
        cityReviews.push(cityReview);
        console.log(cityReviews)
    }
    return await Promise.all(cityReviews);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let addFutureCityReviews = async (userId, cityReviewData) => {
    try {
      let placeRecord = await PlaceVisiting.findByPk(cityReviewData.cityReviews[0].PlaceVisitingId);
      // if (AuthService.isNotLoggedIn(user)) {
      //   throw new ForbiddenError(
      //     "Not Authorized to add city reviews to someone elses account"
      //   );
      // }
      let cityReviews = [];
  
      // Loop through each review they have provided ... create individual records
      for (let review of cityReviewData.cityReviews) {
          let cityReview = placeRecord.createCityReview({
            PlaceVisitingId: review.PlaceVisitingId,
              attraction_type:review.attraction_type,
              attraction_name:review.attraction_name, 
              rating:review.rating,
              comment:review.comment,
              cost:review.cost,
              currency:review.currency
          });
          cityReviews.push(cityReview);
          console.log(cityReviews)
      }
      return await Promise.all(cityReviews);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  let addLivingCityReviews = async (userId, cityReviewData) => {
    try {
      let placeRecord = await PlaceLiving.findByPk(cityReviewData.cityReviews[0].PlaceLivingId);
      // if (AuthService.isNotLoggedIn(user)) {
      //   throw new ForbiddenError(
      //     "Not Authorized to add city reviews to someone elses account"
      //   );
      // }
      let cityReviews = [];
  
      // Loop through each review they have provided ... create individual records
      for (let review of cityReviewData.cityReviews) {
          let cityReview = placeRecord.createCityReview({
            PlaceLivingId: review.PlaceVisitingId,
              attraction_type:review.attraction_type,
              attraction_name:review.attraction_name, 
              rating:review.rating,
              comment:review.comment,
              cost:review.cost,
              currency:review.currency
          });
          cityReviews.push(cityReview);
          console.log(cityReviews)
      }
      return await Promise.all(cityReviews);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

module.exports = {
    addFutureCityReviews,
    addPastCityReviews,
    addLivingCityReviews
};
