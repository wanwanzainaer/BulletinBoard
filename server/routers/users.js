const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pgClinet = require("../database/pgDatabase");
const signupValidation = require("../validation/signupValidation");
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
    //To-do send the  email confirm to active account
    res.send("sucess");
  } catch (error) {
    // To-do Add error which can show on the react
    res.send(error);
  }
});

module.exports = router;
