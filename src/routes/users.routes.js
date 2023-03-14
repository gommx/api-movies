const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.post("/users", (req, res) => {
  res.json({ message: "user created successfully" });
});

module.exports = usersRoutes;
