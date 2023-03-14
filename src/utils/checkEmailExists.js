const knex = require("../database/knex");
const AppError = require("./AppError");

async function checkEmailExists(email) {
  const user = await knex("users").where({ email }).first();

  if (user) {
    throw new AppError("Email already exists", 400);
  }
}

module.exports = { checkEmailExists };
