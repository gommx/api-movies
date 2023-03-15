const knex = require("../database/knex");
const { UtilsPassword } = require("../utils/utilsPassword");
const { checkEmailExists } = require("../utils/checkEmailExists");
const { checkFieldIsEmpty } = require("../utils/checkFieldIsEmpty");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body; // get data from request body

    checkFieldIsEmpty(req.body); // verify if any field is empty

    await checkEmailExists(email); // verify if email already exists

    const utilsPassword = new UtilsPassword(); // create a new instance of UtilsPassword

    const passwordEncrypted = await utilsPassword.encrypt(password); // encrypt password

    await knex("users").insert({ name, email, password: passwordEncrypted }); // insert user in database

    return res.status(201).json({ message: "User created successfully" }); // return a success message
  }

  async update(req, res) {
    const { name, email, new_password, old_password } = req.body; // get data from request body
    const { user_id } = req.params; // get user_id from request params

    checkFieldIsEmpty(req.body); // verify if any field is empty

    const user = await knex("users").where({ id: user_id }).first(); // get user from database

    if (user.email !== email) {
      await checkEmailExists(email); // verify if email already exists
    }

    const utilsPassword = new UtilsPassword(); // create a new instance of UtilsPassword

    await utilsPassword.compare(old_password, user.password); // compare old password with password in database

    const passwordEncrypted = await utilsPassword.encrypt(new_password); // encrypt new password

    await knex("users")
      .update({ name, email, password: passwordEncrypted, updated_at: knex.fn.now() })
      .where({ id: user_id }); // update user in database

    return res.status(200).json({ message: "user updated successfully" }); // return a success message
  }
}

module.exports = UsersController;
