const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.listen(5000, () => {
  console.log("Test server running");
});
