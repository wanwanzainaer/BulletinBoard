const { isEmail, isEmpty } = require("./validator");
const validator = require("validator");
module.exports = data => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";
  if (validator.isEmpty(data.email)) {
    errors.email = "Email must be fill";
  }
  if (!isEmail(data.email)) {
    errors.email = "email must use Cal lutheran edu emails";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Must fill password";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Must fill confirm password";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
