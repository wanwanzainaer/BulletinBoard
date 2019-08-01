const router = require("express").Router();
const passport = require("passport");

const deletePost = require("../database/mongooseQueries/posts/deletePost");
const searchPosts = require("../database/mongooseQueries/posts/searchPosts");
const getPost = require("../database/mongooseQueries/posts/getPost");
const createPost = require("../database/mongooseQueries/posts/createPost");
const editPost = require("../database/mongooseQueries/posts/editPost");
const deleteComment = require("../database/mongooseQueries/posts/deleteComment");

const createComment = require("../database/mongooseQueries/posts/createComment");

const objectIdValid = require("../validation/objectIdValidation");
const createPostValidation = require("../validation/createPostValidation");

router.get("/", async (req, res) => {
  //To-do list add criteria for search
  const posts = await searchPosts(req.query);
  return res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { isValid, mongoId, error } = objectIdValid(req.params.id);
  if (!isValid) return res.status(400).json({ errors: error });
  const post = await getPost(mongoId);
  if (!post)
    return res.status(404).json({ errors: "not found post" });
  return res.json(post);
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = createPostValidation(req.body);
    if (!isValid) {
      return res.json(errors);
    }
    const error = await createPost(req);
    if (error) return res.json(error);
    return res.json({ success: "success" });
  }
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = createPostValidation(req.body);
    if (!isValid) return res.json(errors);
    const mongoObjectId = objectIdValid(req.params.id);
    if (!mongoObjectId.isValid)
      return res.status(400).json({ errors: mongoObjectId.error });
    const someError = await editPost(req, mongoObjectId.mongoId);
    if (someError) return res.json(someError);
    return res.json({ success: "success" });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, mongoId, error } = objectIdValid(req.params.id);
    if (!isValid) return res.status(400).json({ errors: error });
    const someError = await deletePost(req, mongoId);
    if (someError) return res.json({ errors: someError });
    return res.json({ success: "success" });
  }
);

router.post(
  "/comments/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, mongoId, error } = objectIdValid(
      req.params.postId
    );
    if (!isValid) return res.status(400).json({ errors: error });
    const someError = await createComment(req, mongoId);
    if (someError) return res.json({ errors: someError });
    return res.json({ success: "success" });
  }
);

router.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, mongoId, error } = objectIdValid(
      req.params.commentId
    );
    if (!isValid) return res.json({ errors: error });
    const someError = await deleteComment(req, mongoId);
    if (someError) return res.json({ errors: someError });
    return res.json({ success: "success" });
  }
);

module.exports = router;
