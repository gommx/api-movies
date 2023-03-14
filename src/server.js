require("express-async-errors");

const express = require("express");
const app = express();
const routes = require("./routes");
const AppError = require("./utils/AppError");

app.use(express.json());

app.use(routes);

// error-handling middleware
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const port = 3333;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
