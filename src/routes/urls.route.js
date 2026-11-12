const express = require("express");
const {
  shortenConvertController,
  shortenRedirectController,
} = require("../controllers/urls.controller");

const urlsRouter = express.Router();

urlsRouter.post("/api/shorten", shortenConvertController);
urlsRouter.get("/:short", shortenRedirectController);

module.exports = urlsRouter;
