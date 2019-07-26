const router = require("express").Router();
const passport = require("passport");

router.get("/:id", (req, res) => {});

router.post(
  ":/id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
