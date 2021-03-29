const { Op } = require("sequelize");
const { UserInputError } = require("apollo-server");
const User = require("../models").User;
const AuthService = require("../services/auth.service");
const PlaceVisited = require("../models").Place_visited;
const PlaceLiving = require("../models").Place_living;
const PlaceVisiting = require("../models").Place_visiting;
const UserInterests = require("../models").UserInterest;
const UserSocials = require("../models").UserSocial;
const CityReview = require("../models").CityReview;
const BlogPost = require("../models").BlogPost;
const FriendRequest = require("../models").FriendRequest;
const validateBasicInfo = require("../validation/validateBasicInfo");

let loadAllUsers = async (args) => {
  try {
    let users = await User.findAll({
      where: args,
      include: [
        {
          model: PlaceVisited,
          include: [{ model: CityReview }, { model: BlogPost }],
        },
        {
          model: PlaceLiving,
          include: [{ model: CityReview }],
        },
        {
          model: PlaceVisiting,
          include: [{ model: CityReview }],
        },
        { model: UserInterests },
        { model: UserSocials },
      ],
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

let loadAllPotentialFriends = async (args, userId) => {
  try {
    let users = await User.findAll({
      where: args
    });

    let requestTableFriendsArray = [userId];
    let user = await User.findOne({
      where: id = userId
    })
    let userFriends = await user.getFriends();
    for (let i in userFriends) {
        requestTableFriendsArray.push(userFriends[i].dataValues.id);
    }
    let potentialFriends = users.filter(
      (user) => requestTableFriendsArray.indexOf(user.dataValues.id) === -1
    );
    return potentialFriends;
  } catch (err) {
    throw new Error(err);
  }
};

let searchUser = async (args, userId) => {
  try {
    let user = await User.findOne({
      where: args,
      include: [
        {
          model: PlaceVisited,
          include: [{ model: CityReview }, { model: BlogPost }],
        },
        {
          model: PlaceLiving,
          include: [{ model: CityReview }],
        },
        {
          model: PlaceVisiting,
          include: [{ model: CityReview }],
        },
        { model: UserInterests },
        { model: UserSocials },
      ],
    });
    let newUser = await user.getFriends({
      include: [
        {
          model: PlaceVisited,
          include: [{ model: CityReview }, { model: BlogPost }],
        },
        {
          model: PlaceLiving,
          include: [{ model: CityReview }],
        },
        {
          model: PlaceVisiting,
          include: [{ model: CityReview }],
        },
        { model: UserInterests },
        { model: UserSocials },
      ],
    });
    user.Friends = newUser;
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

let searchMultiUser = async (args) => {
  try {
    let multiUserArray = [];
    for (let i in args.username) {
      let newUser = await User.findOne({
        where: { username: args.username[i].username },
        include: [
          {
            model: PlaceVisited,
            include: [{ model: CityReview }, { model: BlogPost }],
          },
          {
            model: PlaceLiving,
            include: [{ model: CityReview }],
          },
          {
            model: PlaceVisiting,
            include: [{ model: CityReview }],
          },
          { model: UserInterests },
          { model: UserSocials },
        ],
      });
      multiUserArray.push(newUser);
    }
    return multiUserArray;
  } catch (err) {
    throw new Error(err);
  }
};

let getPostsFromCity = async (args) => {
  try {
    let multiUserArray = [];
    let multiUserBlogPosts = [];
    for (let i in args.username) {
      let newUser = await User.findOne({
        where: { username: args.username[i].username },
        include: [
          {
            model: PlaceVisited,
            include: [{ model: CityReview }, { model: BlogPost }],
          },
        ],
      });
      multiUserArray.push(newUser);
    }
    for (let i in multiUserArray) {
      let userBlogPosts = {
        id: multiUserArray[i].id,
        username: multiUserArray[i].username,
        avatarIndex: multiUserArray[i].avatarIndex,
        color: multiUserArray[i].color,
        email: multiUserArray[i].email,
        Places_visited: multiUserArray[i].Places_visited.filter((place) => {
          return place.dataValues.cityId === args.cityId;
        }),
      };
      if (userBlogPosts.Places_visited.length >= 1) {
        multiUserBlogPosts.push(userBlogPosts);
      }
    }
    return multiUserBlogPosts;
  } catch (err) {
    throw new Error(err);
  }
};

let getPostsFromCountry = async (args) => {
  try {
    let multiUserArray = [];
    let multiUserBlogPosts = [];
    for (let i in args.username) {
      let newUser = await User.findOne({
        where: { username: args.username[i].username },
        include: [
          {
            model: PlaceVisited,
            include: [{ model: CityReview }, { model: BlogPost }],
          },
        ],
      });
      multiUserArray.push(newUser);
    }
    for (let i in multiUserArray) {
      let userBlogPosts = {
        id: multiUserArray[i].id,
        username: multiUserArray[i].username,
        avatarIndex: multiUserArray[i].avatarIndex,
        color: multiUserArray[i].color,
        email: multiUserArray[i].email,
        Places_visited: multiUserArray[i].Places_visited.filter((place) => {
          return (
            place.dataValues.country === args.country &&
            place.dataValues.BlogPosts.length >= 1
          );
        }),
      };
      if (userBlogPosts.Places_visited.length >= 1) {
        multiUserBlogPosts.push(userBlogPosts);
      }
    }
    return multiUserBlogPosts;
  } catch (err) {
    throw new Error(err);
  }
};

let getLoggedInUser = async (args) => {
  try {
    let user = await User.findOne({
      where: args,
      include: [
        {
          model: PlaceVisited,
          include: [{ model: CityReview }, { model: BlogPost }],
        },
        {
          model: PlaceLiving,
          include: [{ model: CityReview }, { model: BlogPost }],
        },
        {
          model: PlaceVisiting,
          include: [{ model: CityReview }, { model: BlogPost }],
        },
        { model: UserInterests },
        { model: UserSocials },
      ],
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
  console.log(args);
  try {
    let user = await User.findByPk(args.id);
    if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
      throw new ForbiddenError("Not Authorized to delete user");
    }
    return await user.destroy().then((user) => user);
  } catch (err) {
    console.log(err);
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
      full_name: userUpdateInfo.full_name,
      email: userUpdateInfo.email,
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

let updateGeorneyScore = async (userId, georneyScore) => {
  let newGeorneyScore = georneyScore;
  try {
    const user = await User.findByPk(userId);
    if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
      throw new ForbiddenError("Not Authorized to edit this user's info");
    }
    return await user.update(newGeorneyScore).then((user) => user);
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
      avatarIndex: userUpdateInfo.avatarIndex
    };
    return await user.update(userAvatarInfo).then((user) => user);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  loadAllUsers,
  searchUser,
  searchMultiUser,
  getLoggedInUser,
  deleteUser,
  updateBasicInfo,
  updateUserAvatar,
  updateGeorneyScore,
  getPostsFromCity,
  getPostsFromCountry,
  loadAllPotentialFriends,
};
