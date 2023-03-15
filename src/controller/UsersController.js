const knex = require("../database/knex");
const { UtilsPassword } = require("../utils/utilsPassword");
const { checkEmailExists } = require("../utils/checkEmailExists");
const { checkFieldIsEmpty } = require("../utils/checkFieldIsEmpty");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    checkFieldIsEmpty(req.body); // verify if any field is empty

    await checkEmailExists(email); // verify if email already exists

    const utilsPassword = new UtilsPassword();

    const passwordEncrypted = await utilsPassword.encrypt(password);

    await knex("users").insert({ name, email, password: passwordEncrypted }); // insert user in database

    return res.status(201).json({ message: "User created successfully" });
  }

  async update(req, res) {
    const { name, email, new_password, old_password } = req.body;

    return res.status(200).json({ message: "user updated successfully" });
  }
}

module.exports = UsersController;
