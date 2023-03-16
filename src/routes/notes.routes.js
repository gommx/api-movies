const { Router } = require("express");
const moviesRoutes = Router();

const NotesController = require("../controller/NotesController.js");
const notesController = new NotesController();

moviesRoutes.post("/", notesController.create);

module.exports = moviesRoutes;
