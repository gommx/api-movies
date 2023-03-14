const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");

routes.use(usersRoutes);

module.exports = routes;
