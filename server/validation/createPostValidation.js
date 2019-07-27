const { isEmpty } = require("./validator");
const validator = require("validator");
module.exports = data => {
  const errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.type = !isEmpty(data.type) ? data.type : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title must be fill";
  }
  if (validator.isEmpty(data.content)) {
    errors.content = "Must have content";
  }
  if (validator.isEmpty(data.price)) {
    errors.price = "Must give a price";
  }
  if (validator.isEmpty(data.type)) {
    errors.type = "Post's Type error";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
