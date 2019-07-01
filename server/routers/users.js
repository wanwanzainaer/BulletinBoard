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

  // To-do change the coding style with the async await
  bcrpyt.genSalt(10, (err, salt) => {
    bcrpyt.hash(password, salt, (err, hashedPassword) => {
      pgClinet
        .query("INSERT INTO users(email, password) values($1, $2)", [
          email,
          hashedPassword
        ])
        .then(() => {
          // To-Do when the user save account then give user's profile with mongodb
          res.send("sucess");
        })
        .catch(error => {
          res.send(error);
        });
    });
  });
});

module.exports = router;
