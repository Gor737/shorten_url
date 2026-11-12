const {
  shortenConvertService,
  shortenRedirectService,
} = require("../services/urls.service");

const shortenConvertController = async (req, res, next) => {
  try {
    const response = await shortenConvertService(req.body);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

const shortenRedirectController = async (req, res, next) => {
  try {
    const long = await shortenRedirectService(req.params.short);
    res.redirect(302, long);
  } catch (err) {
    next(err);
  }
};

module.exports = { shortenConvertController, shortenRedirectController };
