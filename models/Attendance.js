const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    division: {
      type: String,
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    lectureNumber: {
      type: Number, // 1–6 or more
      required: true,
    },

  
    subjectName: {
      type: String,
      required: true,
    },

    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["present", "absent"],
          default: "absent",
        },
      },
    ],
  },
  { timestamps: true }
);

// UNIQUE on division + date + lectureNumber + subjectCode
AttendanceSchema.index(
  { division: 1, date: 1, lectureNumber: 1, subjectCode: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
