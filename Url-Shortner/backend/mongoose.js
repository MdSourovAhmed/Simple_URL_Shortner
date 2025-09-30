const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// const User = "MdSourovAhmedSamin";
// const Pass = "7111777";
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






// {
//   email: 'sourova343@gmail.com',
//   username: 'MdSourovAhmedSamin',
//   password: '$2b$10$ZdORrHweJwWrn9.EgGZTxOm4/OKVXBDqL7y/8iu/OeUZHu6n7irGS',
//   _id: new ObjectId('68c1195979d9cc30006703ce'),
//   createdAt: 2025-09-10T06:23:21.995Z
// }