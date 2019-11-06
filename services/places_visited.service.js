const User = require("../models").User;
const PlaceVisited = require("../models").Place_visited;
const PlaceVisiting = require("../models").Place_visiting;
const PlaceLiving = require("../models").Place_living;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");

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

// For the removal of places visited in country, we're going to use the Country ISO
// We can take other arguments instead of countryISO if wanted later on
// We'll return an array from [1-n] of the deleted places
// This following method assumes userId is passed in the graphql mutation

// let removePlacesVisitedInCountry = async(args) => {
//   try {
//     let user = await User.findByPk(args.userId);
//     let places_visited_in_country = await PlaceVisited.findAll({
//       where: args
//     });
//     if (places_visited_in_country.length < 1){
//       throw new Error("No places to remove")
//     }
//     if (AuthService.isNotLoggedInOrAuthorized(user, places_visited_in_country[0].UserId)) {
//         throw new ForbiddenError("Not Authorized to remove a place visited to someone elses account")
//     }
//     for (let place = 0; place < places_visited_in_country.length; place ++){
//       places_visited_in_country[place].destroy();
//     }
//     return places_visited_in_country
//   } catch (err) {
//     console.log(err)
//     throw new Error(err)
//   }
// }

//The following method should be used if userId is passed separate from the graphql mutation
let removePlacesInCountry = async (userId, countryISO) => {
  try {
    let user = await User.findByPk(userId);
    let args = countryISO;
    args["UserId"] = userId;
    let places_visited_in_country = await PlaceVisited.findAll({
      where: args
    });
    let places_visiting_in_country = await PlaceVisiting.findAll({
      where: args
    });
    let place_living_in_country = await PlaceLiving.findAll({
      where: args
    });
    if (
      places_visited_in_country.length +
        places_visiting_in_country.length +
        place_living_in_country.length <
      1
    ) {
      throw new Error("No places to remove");
    }
    let all_places = places_visiting_in_country
      .concat(place_living_in_country)
      .concat(places_visited_in_country);

    if (AuthService.isNotLoggedInOrAuthorized(user, all_places[0].UserId)) {
      throw new ForbiddenError(
        "Not Authorized to remove a place visited to someone elses account"
      );
    }
    for (let place = 0; place < all_places.length; place++) {
      all_places[place].destroy();
    }
    return all_places;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  addPlaceVisited,
  removePlaceVisited,
  removePlacesInCountry
};
