const { Router } = require("express");
const moviesRoutes = Router();

const RoutesController = require("../controller/MoviesController.js");
const routesController = new RoutesController();

moviesRoutes.post("/", routesController.create);

module.exports = moviesRoutes;
