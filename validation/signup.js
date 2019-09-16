const Validator = require("validator");
const isEmpty = require("./is-empty");

const User = require("../models").User;

module.exports = async function validateSignupInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let user = await User.findOne({ where: { username: data.username } });
  if (user) {
    errors.username = "Username already exists";
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isLength(data.full_name, { min: 2, max: 30 })) {
    errors.full_name = "Full name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.full_name)) {
    errors.full_name = "Full name is required";
  }

  user = await User.findOne({ where: { email: data.email } });
  if (user) {
    errors.email = "Email already exists";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
