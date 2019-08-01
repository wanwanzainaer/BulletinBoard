const Post = require("../../mongoSchema/Post");
const UserProfile = require("../../mongoSchema/UserProfile");
module.exports = async req => {
  const { type, title, content, price } = req.body;
  try {
    const post = await new Post({
      type,
      title,
      price,
      content,
      user: req.user.id
    }).save();
    await UserProfile.updateOne(
      { _id: req.user.id },
      { $push: { posts: post } }
    );
    return;
  } catch (e) {
    console.log(e);
    return { errors: e };
  }
};
