const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = new Schema({
  content: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "userprofile"
  }
});

module.exports = mongoose.model("comment", Comment);
