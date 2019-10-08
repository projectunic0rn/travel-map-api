const User = require("../models").User;
const AuthService = require("../services/auth.service");
const PlaceVisited = require("../models").Place_visited;
const PlaceLiving = require("../models").Place_living;
const PlaceVisiting = require("../models").Place_visiting;
const FriendRequest = require("../models").FriendRequest;
const Interest = require("../models").Interest;

let loadAllUsers = async (args) => {
  try {
    let users = await User.findAll({
      where: args,
      include: [
        { model: PlaceVisited },
        { model: PlaceLiving },
        { model: PlaceVisiting },
        { model: Interest, as: "Interests" }
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
    console.log(args);
    // if args.id is there that means the user is logged in, so it is ok to return friend requests
    if (args.id !== undefined) {
      user = await User.findOne({
        where: args,
        include: [
          { model: PlaceVisited },
          { model: PlaceLiving },
          { model: PlaceVisiting },
          { model: Interest, as: "Interests" },
          {
            model: FriendRequest
          }
        ]
      });
      console.log(user);
    } else {
      user = await User.findOne({
        where: args,
        include: [
          { model: PlaceVisited },
          { model: PlaceLiving },
          { model: PlaceVisiting },
          { model: Interest, as: "Interests" }
        ]
      });
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
