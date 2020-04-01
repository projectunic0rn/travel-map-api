const User = require("../models").User;
const PlaceVisited = require("../models").Place_visited;
const PlaceVisiting = require("../models").Place_visiting;
const PlaceLiving = require("../models").Place_living;
const CityReview = require("../models").CityReview;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");

let loadPlacesVisited = async args => {
  try {
    let placesVisited = await PlaceVisited.findAll({
      where: args,
      include: [{ model: CityReview }]
    });
    return placesVisited;
  } catch (err) {
    throw new Error(err);
  }
};

let loadCityVisits = async args => {
  try {
    let placesVisited = await PlaceVisited.findAll({
      where: {
        cityId: args
      },
      include: [{ model: CityReview }]
    });
    let placesVisiting = await PlaceVisiting.findAll({
      where: {
        cityId: args
      },
      include: [{ model: CityReview }]
    });
    let placesLiving = await PlaceLiving.findAll({
      where: {
        cityId: args
      },
      include: [{ model: CityReview }]
    });
    return placesVisited.concat(placesVisiting).concat(placesLiving);
  } catch (err) {
    throw new Error(err);
  }
};


let loadCountryVisits = async args => {
  try {
    let placesVisited = await PlaceVisited.findAll({
      where: {
        countryId: args
      },
      include: [{ model: CityReview }]
    });
    let placesVisiting = await PlaceVisiting.findAll({
      where: {
        countryId: args
      },
      include: [{ model: CityReview }]
    });
    let placesLiving = await PlaceLiving.findAll({
      where: {
        countryId: args
      },
      include: [{ model: CityReview }]
    });
    return placesVisited.concat(placesVisiting).concat(placesLiving);
  } catch (err) {
    throw new Error(err);
  }
};

let addPlaceVisited = async (userId, placeVisitedObj) => {
  try {
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError("Not Authorized to add place visited");
    }
    let cities = placeVisitedObj.cities;
    let countryInfo = placeVisitedObj.country;

    let placesVisited = [];
    if (cities.length >= 1) {
      for (let city of cities) {
        let placeVisited = user.createPlace_visited({
          country: countryInfo.country,
          countryId: countryInfo.countryId,
          countryISO: countryInfo.countryISO,
          city: city.city,
          cityId: city.cityId,
          city_latitude: city.city_latitude,
          city_longitude: city.city_longitude
        });
        placesVisited.push(placeVisited);
      }
      console.log(
        `SAVING PLACE VISITED RECORDS WITH AT LEAST 1 CITY ENTERED FOR USER : ${user.id}`
      );
      return await Promise.all(placesVisited);
    } else {
      let placeVisited = await user.createPlace_visited({
        country: countryInfo.country,
        countryId: countryInfo.countryId,
        countryISO: countryInfo.countryISO,
        city: "",
        cityId: 0,
        city_latitude: 0,
        city_longitude: 0
      });
      console.log(
        `SAVE PLACE VISITING RECORD THAT HAS NO CITY ENTERED FOR USER : ${user.id}`
      );
      return [placeVisited];
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let addMultiplePlaces = async (userId, placesArray) => {
  try {
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError("Not Authorized to add place visited");
    }

    let placesVisited = [];
    let placesVisiting = [];
    let placesLiving = [];
    for (let city of placesArray.clickedCityArray) {
      if (city.tripTiming === 0) {
        delete city.tripTiming;
        let placeVisited = user.createPlace_visited(city);
        placesVisited.push(placeVisited);
      } else if (city.tripTiming === 1) {
        delete city.tripTiming;
        let placeVisiting = user.createPlace_visiting(city);
        placesVisiting.push(placeVisiting);
      } else if (city.tripTiming === 2) {
        delete city.tripTiming;
        let placeLiving = user.createPlace_living(city);
        placesLiving.push(placeLiving);
      }
    } 
    return await placesVisited.concat(placesVisiting).concat(placesLiving);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let removePlaceVisited = async (userId, placeVisitedId) => {
  try {
    let user = await User.findByPk(userId);
    let place_visited = await PlaceVisited.findByPk(placeVisitedId);
    if (AuthService.isNotLoggedInOrAuthorized(user, place_visited.UserId)) {
      throw new ForbiddenError(
        "Not Authorized to remove a place visited to someone elses account"
      );
    }
    return await place_visited.destroy();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

//The following method should be used if userId is passed separate from the graphql mutation
let removePlacesInCountry = async (userId, countryISO) => {
  try {
    let user = await User.findByPk(userId);
    let args = countryISO;
    args["UserId"] = userId;
    let timingType = null;
    switch(args.tripTiming) {
      case 0:
        timingType = PlaceVisited;
        break;
      case 1:
        timingType = PlaceVisiting;
        break;
      case 2:
        timingType = PlaceLiving;
        break;
      default:
        break;
    }
    let places_to_remove = await timingType.findAll({
      where: {
        UserId: args.UserId,
        countryISO: args.countryISO
      }
    });
    if (
      places_to_remove <
      1
    ) {
      throw new Error("No places to remove");
    }

    if (AuthService.isNotLoggedInOrAuthorized(user, places_to_remove[0].UserId)) {
      throw new ForbiddenError(
        "Not Authorized to remove a place visited to someone elses account"
      );
    }
    for (let place = 0; place < places_to_remove.length; place++) {
      places_to_remove[place].destroy();
    }
    return places_to_remove;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

let updateVisitedCityBasics = async (userId, cityInfoObject) => {
  let user = await User.findByPk(userId);
  if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
    throw new ForbiddenError("Not Authorized to edit this user's info");
  }
  try {
    let placeRecord = await PlaceVisited.findByPk(
      cityInfoObject.PlaceVisitedId
    );
    let cityBasicInfo = {
      days: cityInfoObject.cityBasics.days,
      year: cityInfoObject.cityBasics.year,
      trip_purpose: cityInfoObject.cityBasics.trip_purpose,
      trip_company: cityInfoObject.cityBasics.trip_company
    };
    return await placeRecord
      .update(cityBasicInfo)
      .then(placeRecord => placeRecord);
  } catch (err) {
    throw new Error(err);
  }
};

let updateVisitedCityComments = async (userId, cityInfoObject) => {
  let user = await User.findByPk(userId);
  if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
    throw new ForbiddenError("Not Authorized to edit this user's info");
  }
  try {
    let placeRecord = await PlaceVisited.findByPk(
      cityInfoObject.PlaceVisitedId
    );
    let cityCommentObject = {
      best_comment: cityInfoObject.cityComments.best_comment,
      hardest_comment: cityInfoObject.cityComments.hardest_comment
    };
    return await placeRecord
      .update(cityCommentObject)
      .then(placeRecord => placeRecord);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  loadPlacesVisited,
  loadCityVisits,
  loadCountryVisits,
  addPlaceVisited,
  removePlaceVisited,
  removePlacesInCountry,
  updateVisitedCityBasics,
  updateVisitedCityComments,
  addMultiplePlaces
};
