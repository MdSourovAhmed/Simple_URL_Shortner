// const dotenv = require("dotenv");
// const express = require("express");
// const mongoose = require("mongoose");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const { body, validationResult } = require("express-validator");
// const cors = require("cors");
// const crypto = require("crypto"); // Built-in Node.js module for secure random
// const Url = require("./models/Url");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 3000;
// dotenv.config();

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Middleware
// app.use(helmet()); // Security headers
// app.use(express.json());

// // CORS configuration
// const corsOptions = {
//   origin: process.env.FRONTEND_URL, // Allow only the specified frontend URL
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"],
//   optionsSuccessStatus: 200,
//   credentials: false,
// };
// app.use(cors(corsOptions));

// // Rate limiting: 100 requests per 15 minutes per IP
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests, please try again later.",
// });
// app.use(limiter);

// // Serve frontend static files
// app.use(express.static(path.join(__dirname, "../frontend")));

// // Custom short code generator using crypto
// const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// function generateShortCode(length = 7) {
//   const bytes = crypto.randomBytes(length);
//   let shortCode = "";
//   for (let i = 0; i < length; i++) {
//     shortCode += base62Chars[bytes[i] % 62];
//   }
//   return shortCode;
// }

// // API endpoint to shorten URL
// app.post(
//   "/shorten",
//   [body("url").isURL().withMessage("Invalid URL")],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const longUrl = req.body.url;
//     let shortCode = generateShortCode(7); // Generate 7-char code

//     // Ensure uniqueness
//     let existing = await Url.findOne({ shortCode });
//     while (existing) {
//       shortCode = generateShortCode(7);
//       existing = await Url.findOne({ shortCode });
//     }

//     try {
//       const newUrl = new Url({ shortCode, longUrl });
//       await newUrl.save();
//       const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
//       res.json({ shortUrl });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// // Redirect route
// app.get("/:shortCode", async (req, res) => {
//   const shortCode = req.params.shortCode;
//   try {
//     const urlDoc = await Url.findOne({ shortCode });
//     if (urlDoc) {
//       res.redirect(301, urlDoc.longUrl);
//     } else {
//       res.status(404).send("URL not found");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// // Serve frontend
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend", "index.html"));
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(helmet());
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
  credentials: false,
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Routes
app.use('/', urlRoutes);
app.use(process.env.ADMIN_PREFIX, adminRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
  // res.send("Worked");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});