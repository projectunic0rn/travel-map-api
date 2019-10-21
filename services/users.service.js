const User = require("../models").User;
const AuthService = require("../services/auth.service");
const PlaceVisited = require("../models").Place_visited;
const PlaceLiving = require("../models").Place_living;
const PlaceVisiting = require("../models").Place_visiting;
const FriendRequest = require("../models").FriendRequest;
const UserInterests = require("../models").UserInterest;
const UserSocials = require("../models").UserSocial;

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
        {
          model: FriendRequest,
          as: "FriendRequests",
          where: { UserId: args.id || null },
          required: false
        },
        { model: UserInterests },
        { model: UserSocials },
        { model: User, as: "Users", required: false }
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

module.exports = {
  loadAllUsers,
  searchUser,
  deleteUser
};
