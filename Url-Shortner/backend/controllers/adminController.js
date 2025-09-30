const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dns = require("dns").promises;
const Url = require("../models/Url");
const Admin = require("../models/Admin");

const registerAdmin = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    const existinguser = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "E-mail already exists." });
    }
    if (existinguser) {
      return res.status(400).json({ error: `${username} already exists. try a different one.` });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin
    const newAdmin = new Admin({
      email,
      username,
      password
    });
    console.log(newAdmin);

    await newAdmin.save();

    // Issue JWT token on successful registration
    // const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    return res.status(201).json({ message:'Registration is successfull. Please Login with your credential.' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log(username+" "+password);
  try {
    const admin = await Admin.findOne({ username });
    console.log(admin.password);
    // if (!admin || !(await bcrypt.compare(password, admin.password))) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }
    if (!admin) {
      return res.status(401).json({ error: "Invalid username" });
    }
    if (!(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const listUrls = async (req, res) => {
  try {
    const urls = await Url.find().select("shortCode longUrl createdAt");
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const editUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { longUrl } = req.body;

  try {
    // Extract hostname and perform DNS resolution
    const { hostname } = new URL(longUrl);
    await dns.resolve(hostname);
  } catch (err) {
    console.error("DNS resolution error:", err);
    return res.status(400).json({ error: "Invalid or unreachable URL domain" });
  }

  try {
    const urlDoc = await Url.findOneAndUpdate(
      { shortCode },
      { longUrl },
      { new: true }
    );
    if (!urlDoc) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.json({ shortCode, longUrl: urlDoc.longUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlDoc = await Url.findOneAndDelete({ shortCode });
    if (!urlDoc) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerAdmin,loginAdmin, listUrls, editUrl, deleteUrl };
