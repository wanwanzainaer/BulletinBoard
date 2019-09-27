const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const keys = require("./config/keys");
const usersRouter = require("./routers/users");
const profileRouter = require("./routers/profile");
const postsRouter = require("./routers/posts");

mongoose
  .connect(`mongodb://mongo:${keys.mongoPort}/bulletinboard`, {
    useNewUrlParser: true
  })
  .then(() => console.log("connect success MongoDB"))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./services/passport")(passport);

app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts/", postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening....");
});
