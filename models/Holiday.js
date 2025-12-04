const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    unique: true,
    required: true,
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

module.exports = mongoose.model("Holiday", HolidaySchema);
