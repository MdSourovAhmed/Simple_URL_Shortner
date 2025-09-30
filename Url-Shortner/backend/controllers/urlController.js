const crypto = require("crypto");
const dns = require("dns").promises;
const Url = require("../models/Url");

const base62Chars =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function generateShortCode(length = 7) {
  const bytes = crypto.randomBytes(length);
  let shortCode = "";
  for (let i = 0; i < length; i++) {
    shortCode += base62Chars[bytes[i] % 62];
  }
  return shortCode;
}

const shortenUrl = async (req, res) => {
  const { url: longUrl } = req.body;

  try {
    // Extract hostname and perform DNS resolution
    const { hostname } = new URL(longUrl);
    await dns.resolve(hostname);
  } catch (err) {
    console.error("DNS resolution error:", err);
    return res.status(400).json({ error: "Invalid or unreachable URL domain" });
  }

  const isLongurl = await Url.findOne({ longUrl });
  console.log(isLongurl);

  if (isLongurl) {
    const shortUrl = `${req.protocol}://${req.get("host")}/${
      isLongurl.shortCode
    }`;
    return res.json({ shortUrl });
  }

  let shortCode = generateShortCode(7);

  let existing = await Url.findOne({ shortCode });
  while (existing) {
    shortCode = generateShortCode(7);
    existing = await Url.findOne({ shortCode });
  }

  try {
    const newUrl = new Url({ shortCode, longUrl });
    await newUrl.save();
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlDoc = await Url.findOne({ shortCode });
    if (urlDoc) {
      res.redirect(301, urlDoc.longUrl);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    res.send("Server error");
  }
};

module.exports = { shortenUrl, redirectUrl };
