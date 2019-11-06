const { UserInputError } = require("apollo-server");

const User = require("../models").User;
const AuthService = require("../services/auth.service");
const PlaceVisited = require("../models").Place_visited;
const PlaceLiving = require("../models").Place_living;
const PlaceVisiting = require("../models").Place_visiting;
const FriendRequest = require("../models").FriendRequest;
const UserInterests = require("../models").UserInterest;
const UserSocials = require("../models").UserSocial;
const validateBasicInfo = require("../validation/validateBasicInfo");

let loadAllUsers = async (args) => {
  try {
    let users = await User.findAll({
      where: args,
      include: [
        { model: PlaceVisited },
        { model: PlaceLiving },
        { model: PlaceVisiting },
        { model: UserInterests },
        { model: UserSocials }
      ]
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

let searchUser = async (args) => {
  try {
    let user;
    user = await User.findOne({
      where: args,
      include: [
        { model: PlaceVisited },
        { model: PlaceLiving },
        { model: PlaceVisiting },
        { model: UserInterests },
        { model: UserSocials }
      ]
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

let getLoggedInUser = async (args) => {
  try {
    let user = await User.findOne({
      where: args,
      include: [
        { model: PlaceVisited },
        { model: PlaceLiving },
        { model: PlaceVisiting },
        { model: UserInterests },
        { model: UserSocials }
      ]
    });
    if (!user) {
      throw "no user logged in";
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

let deleteUser = async (args) => {
  try {
    let user = await User.findByPk(args);
    if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
      throw new ForbiddenError("Not Authorized to delete user");
    }
    return await user.destroy();
  } catch (err) {
    throw new Error(err);
  }
};

let updateBasicInfo = async (userId, userInfoObject) => {
  let userUpdateInfo = userInfoObject.userBasics;
  try {
    const user = await User.findByPk(userId);
    if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
      throw new ForbiddenError("Not Authorized to edit this user's info");
    }
    let userBasicInfo = {
      gender: userUpdateInfo.gender,
      birthday: userUpdateInfo.birthday,
      phone_number: userUpdateInfo.phone_number,
      full_name: userUpdateInfo.full_name
    };
    let { errors, isValid } = await validateBasicInfo(userBasicInfo);
    if (!isValid) {
      return new UserInputError("bad user input", errors);
    }
    return await user.update(userBasicInfo).then((user) => user);
  } catch (err) {
    throw new Error(err);
  }
};

let updateUserAvatar = async (userId, userInfoObject) => {
  let userUpdateInfo = userInfoObject.userAvatar;
  try {
    const user = await User.findByPk(userId);
    if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
      throw new ForbiddenError("Not Authorized to edit this user's info");
    }
    let userAvatarInfo = {
      avatarIndex: userUpdateInfo.avatarIndex,
      color: userUpdateInfo.color
    };
    return await user.update(userAvatarInfo).then((user) => user);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  loadAllUsers,
  searchUser,
  getLoggedInUser,
  deleteUser,
  updateBasicInfo,
  updateUserAvatar
};
