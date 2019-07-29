const Post = require("../mongoSchema/Post");

module.exports = async req => {
  const { type, title, content, price } = req.body;
  try {
    await new Post({
      type,
      title,
      price,
      content,
      user: req.user.id
    }).save();
    return;
  } catch (e) {
    console.log(e);
    return { errors: e };
  }
};
