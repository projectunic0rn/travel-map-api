const User = require("../models").User;
const UserSocials = require("../models").UserSocial;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");

let addUserSocials = async (userId, userSocialArray) => {
  try {
    console.log(userSocialArray);
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to add interests to someone elses account"
      );
    }

    let userSocials = [];

    // Loop through each social they have provided ... create individual records
    for (let social of userSocialArray.userSocials) {
      if (social.id === 0 && social.link !== "") {
        let userSocial = user.createUserSocial({
          name: social.name,
          link: social.link
        });
        userSocials.push(userSocial);
      } else if (social.link === "" && social.id === 0) {
        null;
      }else {
        let socialToUpdate = await UserSocials.findByPk(social.id);
        if (AuthService.isNotLoggedIn(user, socialToUpdate.UserId)) {
          throw new ForbiddenError(
            "Not Authorized to update an social on someone else's account"
          );
        }
        socialToUpdate.update(social).then(userSocials => userSocials);
      }
    }
    console.log(
      `SAVING USER SOCIAL RECORDS WITH AT LEAST ONE RECORD : ${user.id}`
    );
    return await Promise.all(userSocials);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  addUserSocials
};
