const Post = require("../../mongoSchema/Post");
const Comment = require("../../mongoSchema/Comment");

module.exports = async (req, postId) => {
  try {
    const comment = await new Comment({
      content: req.body.content,
      user: req.user.id
    }).save();
    await Post.updateOne(
      { _id: postId },
      { $push: { comments: comment.id } }
    );
    return;
  } catch (e) {
    return e;
  }
};
