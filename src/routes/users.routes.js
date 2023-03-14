const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../controller/UsersController");
const usersController = new UsersController();

usersRoutes.post("/users", usersController.create);
usersRoutes.put("/users", usersController.update);

module.exports = usersRoutes;
