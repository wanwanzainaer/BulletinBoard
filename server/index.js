const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("First initial commit");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening....");
});
