const Post = require("../mongoSchema/Post");

module.exports = async criteria => {
  //Add criteria to search posts
  try {
    posts = await Post.find({})
      .sort({ createAt: -1 })
      .skip(0)
      .limit(3);
    return posts;
  } catch (e) {
    console.log(e);
    return { errors: e };
  }
};
