const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  username: String,
  role: { type: String, required: true },
  otp: Number,
  expiresAt: Date,
});

module.exports = mongoose.model("Otp", otpSchema);
