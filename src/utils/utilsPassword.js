const bcrypt = require("bcrypt");
const AppError = require("./AppError");

class UtilsPassword {
  async encrypt(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async compare(password, passwordCompare) {
    const passwordMatch = await bcrypt.compare(password, passwordCompare);

    if (!passwordMatch) {
      throw new AppError("Incorrect password", 400);
    }
  }
}

module.exports = { UtilsPassword };
