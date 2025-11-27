const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  division: { type: String, required: true },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },

  date: { type: String, required: true }, // YYYY-MM-DD
  lectureNumber: { type: Number, required: true }, // 1–6

  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },

  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: { type: String, enum: ["present", "absent"], default: "absent" },
    },
  ],
});

// One attendance per (division, date, lecture)
AttendanceSchema.index(
  { division: 1, date: 1, lectureNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
