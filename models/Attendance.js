const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },
    date: { type: String, required: true, index: true }, // ISO date string 'YYYY-MM-DD'
    status: { type: String, enum: ["present", "absent"], required: true },
  },
  { timestamps: true }
);

AttendanceSchema.index(
  { studentId: 1, subjectId: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
