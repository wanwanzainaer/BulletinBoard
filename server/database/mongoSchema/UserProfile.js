const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema({
  email: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
    required: true
  },
  //To-do list add Posts Schema
  posts: [String],
  school: {
    type: String,
    required: true
  },
  major: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  lastLoginAt: {
    type: Date
  }
});

module.exports = mongoose.model("userprofile", UserProfile);
