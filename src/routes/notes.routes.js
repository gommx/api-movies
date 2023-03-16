const { Router } = require("express");
const moviesRoutes = Router();

const NotesController = require("../controller/NotesController.js");
const notesController = new NotesController();

moviesRoutes.get("/", notesController.index);
moviesRoutes.post("/", notesController.create);
moviesRoutes.put("/:note_id", notesController.update);
moviesRoutes.delete("/:note_id", notesController.delete);

module.exports = moviesRoutes;
