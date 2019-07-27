const router = require("express").Router();
const passport = require("passport");
const Post = require("../database/mongoSchema/Post");
const searchPosts = require("../database/mongooseQueries/searchPosts");

const createPostValidation = require("../validation/createPostValidation");

router.get("/", async (req, res) => {
  //To-do list add criteria for search
  const posts = await searchPosts(req.query);
  return res.json(posts);
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = createPostValidation(req.body);
    if (!isValid) {
      return res.json(errors);
    }
    const { type, title, content, price } = req.body;
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
    return res.json({ errors: "some thing errors " });
  }
);

module.exports = router;
