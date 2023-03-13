exports.up = (knex) =>
  knex.schema.createTable("movie_notes", (table) => {
    table.increments("id");

    table.text("title").notNull();
    table.text("description").notNull();

    table.integer("rating").notNull();
    table.integer("user_id").notNull().references("id").inTable("users").onDelete("CASCADE");

    table.timestamp("created_at").notNull().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNull().defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable("movie_notes");
