const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userprofile"
  },
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
  //Who to use this
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  // Location Type
  //   location: {
  //     type: {
  //       type: String,
  //       enum: ["Point"],
  //       required: true
  //     },
  //     coordinates: {
  //       type: [Number],
  //       required: true
  //     }
  //   },
  createAt: {
    type: Date,
    default: Date.now
  }
});

Post.index({ name: "text", title: "text" });

Post.virtual("commentCount", function(next) {
  return this.comments.length;
});

module.exports = mongoose.model("post", Post);
