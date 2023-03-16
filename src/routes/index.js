const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes.js");

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;
