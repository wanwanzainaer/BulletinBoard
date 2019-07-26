const router = require("express").Router();
const passport = require("passport");
const ObjectId = require("mongoose").Types.ObjectId;
const UserProfile = require("../database/mongoSchema/UserProfile");

router.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.json({ error: "ID is not valid" });
  }
  try {
    const userProfile = await UserProfile.findById(
      ObjectId(req.params.id)
    );
    if (!userProfile) {
      return res.json({ errors: "do not have user" });
    }
    console.log(userProfile);
    const { email, type, school, major } = userProfile;
    return res.json({ email, type, school, major });
  } catch (e) {
    console.log(e);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { major } = req.body;
    try {
      await UserProfile.updateOne({ _id: req.user.id }, { major });
    } catch (e) {
      console.log(e);
    }
    // change code.
    return res.json({ sucess: "sucess" });
  }
);

module.exports = router;
