class NotesController {
  async create(req, res) {
    res.status(201).json({ message: "movie created successfully" });
  }
}

module.exports = NotesController;