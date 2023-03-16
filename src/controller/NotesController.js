const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { checkFieldIsEmpty } = require("../utils/checkFieldIsEmpty");

class NotesController {
  async create(req, res) {
    // create a new note
    const { title, description, rating, tags } = req.body; // get data from request body
    const { user_id } = req.headers; // get user_id from request headers

    // verify if any field is empty
    checkFieldIsEmpty(req.body);
    checkFieldIsEmpty(tags);
    checkFieldIsEmpty(user_id);

    const user = await knex("users").where({ id: user_id }).first(); // get user from database

    // verify if user exists
    if (!user) {
      throw new AppError("user not found");
    }

    // verify if rating is valid
    const isRatingValid = rating >= 0 && rating <= 5;

    if (!isRatingValid) {
      throw new AppError("invalid rating");
    }

    // verify if movie already exists
    const isMovieRepeated = await knex("movie_notes").where({ user_id, title }).first();

    if (isMovieRepeated) {
      throw new AppError("have you registered this movie before");
    }

    // create a new note
    const newNote = await knex("movie_notes")
      .insert({ title, description, rating, user_id })
      .returning("id"); // return the id of the new note

    const note_id = newNote[0].id; // get the id of the new note

    // create tags
    await knex("movie_tags").insert({ note_id, user_id, name: tags });

    res.status(201).json({ message: "movie note created successfully" });
  }

  async update(req, res) {
    const { title, description, rating, tags } = req.body;
    const { user_id } = req.headers;
    const { note_id } = req.params;

    checkFieldIsEmpty(req.body);
    checkFieldIsEmpty(user_id);
    checkFieldIsEmpty(note_id);
    checkFieldIsEmpty(tags);

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("user not found");
    }

    // verify if note exists
    const note = await knex("movie_notes").where({ id: note_id }).first();

    if (!note) {
      throw new AppError("note not found");
    }

    // verify if note belongs to user
    if (note.user_id !== user.id) {
      throw new AppError("this note belongs to another user");
    }

    // verify if rating is valid
    const isRatingValid = rating >= 0 && rating <= 5;

    if (!isRatingValid) {
      throw new AppError("invalid rating");
    }

    // verify if movie already exists
    if (title !== note.title) {
      // if the title is different from the previous one
      const isMovieRepeated = await knex("movie_notes").where({ user_id, title }).first();

      if (isMovieRepeated) {
        throw new AppError("have you registered this movie before");
      }
    }

    // update note
    await knex("movie_notes")
      .update({ title, description, rating, updated_at: knex.fn.now() })
      .where({ id: note_id });

    // update tags
    await knex("movie_tags").update({ name: tags }).where({ note_id });

    res.status(200).json({ message: "note updated successfully" });
  }

  async delete(req, res) {
    const { note_id } = req.params;
    const { user_id } = req.headers;

    const note = await knex("movie_notes").where({ id: note_id }).first();

    // verify if note exists
    if (!note) {
      throw new AppError("note not found");
    }

    // verify if note belongs to user
    if (note.user_id !== Number(user_id)) {
      throw new AppError("note is not from this user");
    }

    // delete note
    await knex("movie_notes").where({ id: note_id }).del();

    res.status(200).json({ message: "note deleted successfully" });
  }

  async index(req, res) {
    const { user_id } = req.headers;

    // get all notes from user
    const notes = await knex("movie_notes")
      .join("movie_tags", "movie_notes.id", "movie_tags.note_id")
      .where({ "movie_notes.user_id": user_id })
      .select("*")
      .orderBy("movie_notes.created_at", "desc");

    res.status(200).json({ notes });
  }

  async show(req, res) {
    const { note_id } = req.params;
    const { user_id } = req.headers;

    // get note from user
    const note = await knex("movie_notes")
      .join("movie_tags", "movie_notes.id", "movie_tags.note_id")
      .where({ "movie_notes.user_id": user_id, "movie_notes.id": note_id })
      .select("*")
      .first();

    // verify if note exists
    if (!note) {
      throw new AppError("note not found");
    }

    res.status(200).json({ note });
  }
}

module.exports = NotesController;
