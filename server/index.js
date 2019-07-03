const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const keys = require("./config/keys");
const users = require("./routers/users");

mongoose
  .connect(`mongodb://mongo:${keys.mongoPort}/bulletinboard`, {
    useNewUrlParser: true
  })
  .then(() => console.log("connect"))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./servers/passport")(passport);

// app.use("/", (req, res) => {
//   res.send("Change for the Dev env");
// });
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening....");
});
