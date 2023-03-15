const bcrypt = require("bcrypt");

class UtilsPassword {
  async encrypt(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async compare(password) {}
}

module.exports = { UtilsPassword };
