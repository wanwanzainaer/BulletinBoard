const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pgClinet = require("../database/pgDatabase");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("you must enter email or password");
  }
  //   const saltRounds = await bcrpyt.genSalt(10);

  bcrpyt.genSalt(10, (err, salt) => {
    console.log(password);
    bcrpyt.hash(password, salt, (err, hashedPassword) => {
      console.log(hashedPassword);
      pgClinet
        .query("INSERT INTO users(email, password) values($1, $2)", [
          email,
          hashedPassword
        ])
        .then(() => {
          res.send("sucess");
        })
        .catch(error => {
          res.send(error);
        });
    });
  });
  //   const hashedPassword = await new Promise((resolve, reject) => {
  //     bcrypt.hash(password, saltRounds, (err, hash) => {
  //       if (err) reject(err);
  //       resolve(hash);
  //     });
  //   });
});

module.exports = router;
