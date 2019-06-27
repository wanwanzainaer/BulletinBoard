const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Change for the Dev env");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening....");
});
