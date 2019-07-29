const Post = require("../mongoSchema/Post");

module.exports = async postId => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (e) {
    return { errors: e };
  }
};
