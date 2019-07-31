const Post = require("../../mongoSchema/Post");

module.exports = async (req, id) => {
  try {
    const post = await Post.findById(id);
    if (!post) return { error: "not exist the post" };
    if (req.user.id != post.user) {
      return { error: "not the user's post" };
    }
    await post.remove();
    return;
  } catch (e) {
    return { error: e };
  }
};
