const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, require: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Admin = mongoose.model("Admin", adminSchema);
const existingAdmin = Admin.find();
console.log(existingAdmin);
// bcrypt.hash(Pass, 10, (err, ans) => {
//   if (err) {
//     console.log("Error occured");
//     return;
//   }
//   console.log(ans);
//   const saveAdmin = new Admin({ username: User, password: ans });
//   console.log(saveAdmin);
//   saveAdmin.save();
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


