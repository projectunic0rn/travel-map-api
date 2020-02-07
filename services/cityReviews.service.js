const User = require("../models").User;
const PlaceVisited = require("../models").Place_visited;
const PlaceVisiting = require("../models").Place_visiting;
const PlaceLiving = require("../models").Place_living;
const CityReviews = require("../models").CityReview;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");

let addPastCityReviews = async (userId, cityReviewData) => {
  try {
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to add city reviews to someone elses account"
      );
    }
    let placeRecord = await PlaceVisited.findByPk(
      cityReviewData.cityReviews[0].PlaceVisitedId
    );
    let cityReviews = [];
    // Loop through each review they have provided ... create individual records
    for (let review of cityReviewData.cityReviews) {
      if (review.id === 0) {
        let cityReview = placeRecord.createCityReview({
          id: review.id,
          reviewPlaceId: review.reviewPlaceId,
          review_latitude: review.review_latitude,
          review_longitude: review.review_longitude,
          PlaceVisitedId: review.PlaceVisitedId,
          attraction_type: review.attraction_type,
          attraction_name: review.attraction_name,
          rating: review.rating,
          comment: review.comment,
          cost: review.cost,
          currency: review.currency
        });
        cityReviews.push(cityReview);
      } else {
        let reviewToUpdate = await CityReviews.findByPk(review.id);
        console.log(reviewToUpdate);
        if (AuthService.isNotLoggedIn(user, reviewToUpdate.UserId)) {
          throw new ForbiddenError(
            "Not Authorized to update an interest on someone else's account"
          );
        }
        reviewToUpdate.update(review).then(cityReviews => cityReviews);
      }
    }
    return await Promise.all(cityReviews);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let removeCityReviews = async (userId, CityReviewId) => {
  try {
    let user = await User.findByPk(userId);
    let city_review = await CityReviews.findByPk(CityReviewId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to remove city reviews from someone elses account"
      );
    }
    return await city_review.destroy();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let addFutureCityReviews = async (userId, cityReviewData) => {
  try {
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to add city reviews to someone elses account"
      );
    }
    let placeRecord = await PlaceVisiting.findByPk(
      cityReviewData.cityReviews[0].PlaceVisitingId
    );
    let cityReviews = [];
    // Loop through each review they have provided ... create individual records
    for (let review of cityReviewData.cityReviews) {
      if (review.id === 0) {
        let cityReview = placeRecord.createCityReview({
          id: review.id,
          reviewPlaceId: review.reviewPlaceId,
          review_latitude: review.review_latitude,
          review_longitude: review.review_longitude,
          PlaceVisitingId: review.PlaceVisitedId,
          attraction_type: review.attraction_type,
          attraction_name: review.attraction_name,
          rating: review.rating,
          comment: review.comment,
          cost: review.cost,
          currency: review.currency
        });
        cityReviews.push(cityReview);
      } else {
        let reviewToUpdate = await CityReviews.findByPk(review.id);
        console.log(reviewToUpdate);
        if (AuthService.isNotLoggedIn(user, reviewToUpdate.UserId)) {
          throw new ForbiddenError(
            "Not Authorized to update an interest on someone else's account"
          );
        }
        reviewToUpdate.update(review).then(cityReviews => cityReviews);
      }
    }
    return await Promise.all(cityReviews);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let addLivingCityReviews = async (userId, cityReviewData) => {
  try {
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to add city reviews to someone elses account"
      );
    }
    let placeRecord = await PlaceLiving.findByPk(
      cityReviewData.cityReviews[0].PlaceLivingId
    );
    let cityReviews = [];
    // Loop through each review they have provided ... create individual records
    for (let review of cityReviewData.cityReviews) {
      if (review.id === 0) {
        let cityReview = placeRecord.createCityReview({
          id: review.id,
          reviewPlaceId: review.reviewPlaceId,
          review_latitude: review.review_latitude,
          review_longitude: review.review_longitude,
          PlaceLivingId: review.PlaceVisitedId,
          attraction_type: review.attraction_type,
          attraction_name: review.attraction_name,
          rating: review.rating,
          comment: review.comment,
          cost: review.cost,
          currency: review.currency
        });
        cityReviews.push(cityReview);
      } else {
        let reviewToUpdate = await CityReviews.findByPk(review.id);
        console.log(reviewToUpdate);
        if (AuthService.isNotLoggedIn(user, reviewToUpdate.UserId)) {
          throw new ForbiddenError(
            "Not Authorized to update an interest on someone else's account"
          );
        }
        reviewToUpdate.update(review).then(cityReviews => cityReviews);
      }
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
  removeCityReviews,
  addLivingCityReviews
};
