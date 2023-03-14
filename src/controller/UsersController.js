const knex = require("../database/knex");
const { encryptPassword } = require("../utils/encryptPassword");
const { checkEmailExists } = require("../utils/checkEmailExists");
const { checkFieldIsEmpty } = require("../utils/checkFieldIsEmpty");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    checkFieldIsEmpty(req.body); // verify if any field is empty

    await checkEmailExists(email); // verify if email already exists

    const passwordEncrypted = await encryptPassword(password); // encrypt password

    await knex("users").insert({ name, email, password: passwordEncrypted }); // insert user in database

    return res.status(201).json({ message: "User created successfully" });
  }
}

module.exports = UsersController;
