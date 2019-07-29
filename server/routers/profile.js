const router = require("express").Router();
const passport = require("passport");
const ObjectId = require("mongoose").Types.ObjectId;
const objectIdValid = require("../validation/objectIdValidation");
const UserProfile = require("../database/mongoSchema/UserProfile");

router.get("/:id", async (req, res) => {
  const { isValid, mongoId, error } = objectIdValid(req.params.id);
  if (!isValid) return res.status(400).json({ errors: error });

  try {
    const userProfile = await UserProfile.findById(mongoId);
    if (!userProfile) {
      return res.status(404).json({ errors: "do not have user" });
    }
    const { type, school, major } = userProfile;
    return res.json({ type, school, major });
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
    //TO-DO change success response
    return res.json({ success: "success" });
  }
);

module.exports = router;
