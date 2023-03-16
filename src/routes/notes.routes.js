const { Router } = require("express");
const moviesRoutes = Router();

const NotesController = require("../controller/NotesController.js");
const notesController = new NotesController();

moviesRoutes.post("/", notesController.create);
moviesRoutes.put("/:note_id", notesController.update)

module.exports = moviesRoutes;
