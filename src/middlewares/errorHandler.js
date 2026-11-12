const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
