const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

const port = 3333;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
