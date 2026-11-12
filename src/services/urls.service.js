const crypto = require("node:crypto");
const { createUrl, findByShort } = require("../models/urls.model");
const { BASE_URL } = require("../constants/app.constants");
const AppError = require("../utils/AppError");

const RANDOM_BYTES = 5;
const COUNT = 5;

const generateShort = () =>
  crypto.randomBytes(RANDOM_BYTES).toString("base64url");

const shortenConvertService = async (body) => {
  const { long } = body || {};
  if (!long || typeof long !== "string")
    throw new AppError("url is required", 400);

  let parsed = null;
  try {
    parsed = new URL(long);
  } catch (err) {
    throw new AppError("invalid url", 400);
  }

  const protocol = parsed.protocol;
  if (protocol !== "https:" && protocol !== "http:")
    throw new AppError("Invalid protocol", 400);

  for (let i = 0; i < COUNT; ++i) {
    const short = generateShort();

    try {
      const res = await createUrl(short, long);
      return { shortUrl: `${BASE_URL}/${short}` };
    } catch (err) {
      if (err.code === "23505") continue;
      else throw err;
    }
  }

  throw new AppError("Could not generate a unique short url", 500);
};

const shortenRedirectService = async (shortUrl) => {
    const res = await findByShort(shortUrl);
    if(!res) throw new AppError("cannot find url", 404);
    return {url: res.long};
};

module.exports = { shortenConvertService, shortenRedirectService };
