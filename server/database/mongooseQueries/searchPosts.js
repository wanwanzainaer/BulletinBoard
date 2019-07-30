const Post = require("../mongoSchema/Post");

module.exports = async criteria => {
  //Add criteria to search posts
  try {
    posts = await Post.find(buildQuery(criteria))
      .populate("user", ["major", "school"])
      .sort({ createAt: -1 })
      .skip(0)
      .limit(3);
    return posts;
  } catch (e) {
    console.log(e);
    return { errors: e };
  }
};

const buildQuery = criteria => {
  const query = {};
  if (criteria.name) query.$text = { $search: criteria.name };
  if (criteria.pirceMin) query.price = { $gte: criteria.pirceMin };
  if (criteria.priceMax)
    query.price = !query.price
      ? { $lte: criteria.priceMax }
      : { ...query.price, $lte: criteria.priceMax };
  // add skip and offset and title query
  return query;
};
