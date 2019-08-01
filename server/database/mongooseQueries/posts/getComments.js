const Post = require("../../mongoSchema/Post");
module.exports = async postId => {
  try {
    const comments = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "user", select: ["school", "major"] }
    });
    return { comments: comments.comments };
  } catch (e) {
    return { someError: e };
  }
};
