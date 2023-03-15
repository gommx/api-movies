const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../controller/UsersController");
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:user_id", usersController.update);
usersRoutes.delete("/:user_id", usersController.delete);

module.exports = usersRoutes;
