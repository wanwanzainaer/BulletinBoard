const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrls: {
    type: [String]
  },
  price: {
    type: Number
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});
