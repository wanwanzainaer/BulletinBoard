const Post = require("../../mongoSchema/Post");
const Comment = require("../../mongoSchema/Comment");

module.exports = async (req, postId, commentId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return "not found the comment";

    if (req.user.id != comment.user) return "Not the auth user";

    await Comment.deleteOne({ _id: commentId });
  } catch (e) {
    return e;
  }
};
