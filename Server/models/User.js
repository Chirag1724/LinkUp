const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  status: String, // Student or Alumni
  gradYear: Number,
  department: String,
  company: String,
  jobTitle: String,
  linkedin: String,
  resetToken: String,
  resetTokenExpiry: Date
});

module.exports = mongoose.model("User", userSchema);
