const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const pgClinet = require("../database/pgDatabase");
const signupValidation = require("../validation/signupValidation");
const loginValidation = require("../validation/loginValidation");
const UserProfile = require("../database/mongoSchema/UserProfile");
const key = require("../config/secretKey").jwtSecretKey;

// @route   Post api/users/signup
// @desc    Register user
// @access  Public
router.post("/signup", async (req, res) => {
  const { errors, isValid } = signupValidation(req.body);
  if (!isValid) {
    return res.send(errors);
  }
  const { email, password } = req.body;
  try {
    const salt = await bcrpyt.genSalt(10);
    const hashedPassword = await bcrpyt.hash(password, salt);
    await pgClinet.query(
      "INSERT INTO users(email, password) values($1, $2)",
      [email, hashedPassword]
    );
    // To-do in furture will open more scholl user match the email
    await new UserProfile({
      school: "Cal Lutheran",
      email
    }).save();

    //To-do send the  email confirm to active account
    res.send("sucess");
  } catch (error) {
    // To-do Add error which can show on the react
    res.send(error);
  }
});

// @route   Post api/users/login
// @desc    User Login
// @access  Public
router.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.send(errors);
  }
  const { email, password } = req.body;

  // Try confirm User account and user password are correct
  try {
    const user = await pgClinet.query(
      "SELECT * FROM users where email =$1",
      [email]
    );
    if (!user.rowCount) {
      errors.email = "Not found email";
      return res.status.json(errors);
    }
    const isMatch = await bcrpyt.compare(
      password,
      user.rows[0].password
    );
    if (!isMatch) {
      errors.password = "Password incorrect";
      return res.status(400).json(errors);
    }
  } catch (e) {
    console.log(e);
  }

  // Try get the User's profile and send the token back
  try {
    const userProfile = await UserProfile.findOne({ email });
    console.log(userProfile);
    const payload = {
      id: userProfile.id,
      email
    };
    const token = await jwt.sign(payload, key, { expiresIn: 360000 });
    res.json({
      success: true,
      token: `Bearer ${token}`
    });
  } catch (e) {
    res.status(400).json({ error: "Not found user profile" });
  }
});

// @route   Post api/users/test
// @desc    Check JWT workign
// @access  Private
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send("test");
  }
);

module.exports = router;
