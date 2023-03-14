const AppError = require("./AppError");

function checkFieldIsEmpty(dataUsers) {
  for (const field in dataUsers) {
    if (!dataUsers[field]) {
      console.log(dataUsers[field]);
      throw new AppError(`The field '${field}' is empty`, 400);
    }
  }
}

module.exports = { checkFieldIsEmpty };
