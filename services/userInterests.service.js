const User = require("../models").User;
const UserInterests = require("../models").UserInterest;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");
// const socket = require('../socket');

let addUserInterests = async (userId, userInterestArray) => {
  try {
    console.log(userInterestArray);
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to add interests to someone elses account"
      );
    }

    let userInterests = [];

    // Loop through each interest they have provided ... create individual records
    for (let interest of userInterestArray.userInterests) {
      if (interest.id === 0) {
        let userInterest = user.createUserInterest({
          name: interest.name
        });
        userInterests.push(userInterest);
      } else {
        let interestToUpdate = await UserInterests.findByPk(interest.id);
        if (AuthService.isNotLoggedIn(user, interestToUpdate.UserId)) {
          throw new ForbiddenError(
            "Not Authorized to update an interest on someone else's account"
          );
        }
        interestToUpdate.update(interest).then(userInterests => userInterests);
      }
    }
    console.log(
      `SAVING USER INTEREST RECORDS WITH AT LEAST ONE RECORD : ${user.id}`
    );
    return await Promise.all(userInterests);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

// let removePlaceVisiting = async (userId, placeVisitingId) => {
//   try {
//     let user = await User.findByPk(userId);
//     let placeVisiting = await PlaceVisiting.findByPk(placeVisitingId);
//     if (AuthService.isNotLoggedInOrAuthorized(user, placeVisiting.UserId)) {
//       throw new ForbiddenError(
//         "Not Authorized to remove a place visiting on someone elses account"
//       );
//     }
//     return await placeVisiting.destroy();
//   } catch (err) {
//     console.error(err);
//     throw new Error(err);
//   }
// };

// let updatePlaceLiving = async (userId, updatedPlaceLivingObj) => {
//   try {
//       console.log(userId)
//       console.log(updatedPlaceLivingObj)
//       let user = await User.findByPk(userId);
//       let placeLiving = await PlaceLiving.findByPk(updatedPlaceLivingObj.id);
//       if (!placeLiving) {
//         throw new Error("Not a valid living place instance")
//       };
//       if (AuthService.isNotLoggedIn(user, placeLiving.UserId)) {
//           throw new ForbiddenError("Not Authorized to add a place living to someone elses account")
//       }
//       let livingPlace = {
//         country: updatedPlaceLivingObj.country.country,
//         countryId: updatedPlaceLivingObj.country.countryId,
//         countryISO: updatedPlaceLivingObj.country.countryISO,
//         city: updatedPlaceLivingObj.cities.city,
//         cityId: updatedPlaceLivingObj.cities.cityId,
//         city_latitude: updatedPlaceLivingObj.cities.city_latitude,
//         city_longitude: updatedPlaceLivingObj.cities.city_longitude
//       }
//       return await placeLiving.update(livingPlace).then(place_living => place_living);
//   } catch (err) {
//       console.error(err)
//       throw new Error(err)
//   }
// }

module.exports = {
  addUserInterests
};
