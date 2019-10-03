const User = require("../models").User;
const UserInterests = require("../models").UserInterests;
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
        let userInterest = user.createUserInterest({
            name: interest.name
        });
        userInterests.push(userInterest);
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

module.exports = {
    addUserInterests
};
