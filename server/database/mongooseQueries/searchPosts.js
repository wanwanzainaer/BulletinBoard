const Post = require("../mongoSchema/Post");

module.exports = async criteria => {
  try {
    posts = await Post.find({})
      .sort({ createAt: -1 })
      .skip(0)
      .limit(6);
    return posts;
  } catch (e) {
    console.log(e);
    return { errors: e };
  }
};
