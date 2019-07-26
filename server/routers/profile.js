const router = require("express").Router();
const passport = require("passport");
const UserProfile = require("../database/mongoSchema/UserProfile");

router.get("/:id", (req, res) => {});

router.post(
  ":/id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
