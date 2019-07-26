const router = require("express").Router();
const passport = require("passport");
const Post = require("../database/mongoSchema/Post");
const searchPosts = require("../database/mongooseQueries/searchPosts");

router.get("/", async (req, res) => {
  //To-do list add criteria for search
  const posts = await searchPosts();
  return res.json(posts);
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { type, title, content, price } = req.body;
    // const price = parseFloat(req.body.price);
    console.log(typeof price);
    console.log(typeof req.user.id);
    try {
      await new Post({
        type,
        title,
        price,
        content,
        user: req.user.id
      }).save();
      return res.json({ success: "success" });
    } catch (e) {
      console.log(e);
    }
    return res.json({ error: "some thing errors " });
  }
);

module.exports = router;
