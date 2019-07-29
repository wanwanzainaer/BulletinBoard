const ObjectId = require("mongoose").Types.ObjectId;
module.exports = id => {
  if (!ObjectId.isValid(id))
    return { isValid: false, error: "Id is not a valid id" };
  return { isValid: true, mongoId: ObjectId(id) };
};
