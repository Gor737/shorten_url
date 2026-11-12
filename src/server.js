const express = require("express");
const { PORT } = require("./constants/app.constants");
const urlsRouter = require("./routes/urls.route");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

// routes
app.use("/", urlsRouter);

// unknown route
app.use((req, res) => {
  res.status(404).json({ error: "Unknown route" });
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
