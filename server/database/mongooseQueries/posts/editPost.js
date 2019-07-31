const Post = require("../../mongoSchema/Post");

module.exports = async (req, postId) => {
  const { type, title, content, price } = req.body;
  try {
    await Post.updateOne(
      { _id: postId, user: req.user.id },
      {
        type,
        title,
        price,
        content
      }
    );
    return;
  } catch (e) {
    console.log(e);
    return { errors: e };
  }
};
