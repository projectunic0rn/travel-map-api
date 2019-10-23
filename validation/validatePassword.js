const Validator = require("validator");
const bcrypt = require("bcryptjs");


const isEmpty = require("./is-empty");
const User = require("../models").User;

module.exports = async function validateSignupInput(data, userId) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  let user = await User.findByPk(userId);

  if (bcrypt.compare(user.password, data.password)) {
    errors.password = "Password incorrect";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (data.password2 !== data.password) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
