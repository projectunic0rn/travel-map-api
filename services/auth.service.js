var jwt = require("jsonwebtoken");
const User = require("../models").User;
const bcrypt = require("bcryptjs");
const { AuthenticationError, UserInputError } = require("apollo-server");
const tokenSecret = process.env.TOKEN_SECRET;

const validateSignupInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");
const validatePassword = require("../validation/validatePassword");

let generateUserToken = async (user) => {
  try {
    token = await jwt.sign({ user_id: user.id }, tokenSecret);
    return { token: token };
  } catch (err) {
    throw new Error(err);
  }
};

let loginUser = async (userObj) => {
  try {
    const { errors, isValid } = await validateLoginInput(userObj);
    if (!isValid) {
      return new UserInputError("bad user input", errors);
    }

    let user = await User.findOne({ where: { username: userObj.username } });
    if (!user) {
      errors.username = "Username not found";
      return new UserInputError("bad user input", errors);
    }

    let isMatch = await bcrypt.compare(userObj.password, user.password);
    if (isMatch) {
      return generateUserToken(user);
    } else {
      errors.password = "Password not found";
      return new UserInputError("bad user input", errors);
    }
  } catch (err) {
    throw new Error(err);
  }
};

let registerUser = async (userObj) => {
  try {
    const { errors, isValid } = await validateSignupInput(userObj);
    if (!isValid) {
      return new UserInputError("bad user input", errors);
    }

    let plainPassword = userObj.password;
    let hashedPassword = await bcrypt.hash(plainPassword, 13);
    userObj.password = hashedPassword;
    userObj.avatarIndex = 1;
    userObj.color = "rgb(100, 100, 100)";
    let user = await User.create(userObj);
    return generateUserToken(user);
  } catch (err) {
    throw new Error(err);
  }
};

let changePassword = async (userId, oldPassword, password, password2) => {
  const { errors, isValid } = await validatePassword(
    { oldPassword, password, password2 },
    userId
  );

  console.log(oldPassword, password, password2);

  if (!isValid) {
    return new UserInputError("bad user input", errors);
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 13);

    let user = await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

let verifyToken = async (token) => {
  try {
    let decodedData = await jwt.verify(token, tokenSecret);
    if (decodedData) {
      return decodedData;
    }
    throw new AuthenticationError("Invalid JWT token passed");
  } catch (err) {
    throw new Error(err);
  }
};

let isNotLoggedIn = (user) => {
  return user == null;
};

let isNotLoggedInOrAuthorized = (user, userIdToCheck) => {
  return user == null || user.id !== userIdToCheck;
};

module.exports = {
  generateUserToken,
  loginUser,
  registerUser,
  verifyToken,
  isNotLoggedIn,
  isNotLoggedInOrAuthorized, 
  changePassword
};
