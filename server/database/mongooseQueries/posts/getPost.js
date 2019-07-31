const Post = require("../../mongoSchema/Post");

module.exports = async postId => {
  try {
    const post = await Post.findById(postId)
      .populate("user", ["major", "school"])
      .populate({
        path: "comments",
        populate: { path: "user", select: ["major", "school"] }
      });
    return post;
  } catch (e) {
    return { errors: e };
  }
};
