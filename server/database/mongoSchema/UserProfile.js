const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema({
  email: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  //To-do list add Posts Schema
  posts: [String],
  createdAt: { type: Date, required: true },
  lastLoginAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.Model("userprofile", UserProfile);
