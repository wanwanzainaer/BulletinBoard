const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const users = require("./routers/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/", (req, res) => {
//   res.send("Change for the Dev env");
// });
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening....");
});
