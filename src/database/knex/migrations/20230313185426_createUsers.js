exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");

    table.text("name").notNull();
    table.text("email").notNull().unique();
    table.text("password").notNull();
    table.text("avatar").nullable().defaultTo(null);

    table.timestamp("created_at").notNull().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNull().defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("users");
