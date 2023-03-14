exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    // Aqui, estamos removendo a restrição unique da coluna email.
    table.dropUnique(["email"]);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    // Aqui, estamos adicionando a restrição unique novamente à coluna email.
    table.unique(["email"]);
  });
};
