const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = async function validateSignupInput(data) {
  let errors = {};

  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";

  if (!Validator.isLength(data.full_name, { min: 2, max: 30 })) {
    errors.full_name = "Full name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.full_name)) {
    errors.full_name = "Full name is required";
  }

  if (!isEmpty(data.phone_number)) {
    if (!Validator.isMobilePhone(data.phone_number)) {
      errors.phone_number = "Phone number is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
